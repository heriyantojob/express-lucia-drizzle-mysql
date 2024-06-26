import { lucia } from '@/lib/lucia';
import { z } from 'zod';
import { db } from "@/db/setup";
import * as argon2 from "argon2";
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

const schema = z.object({
  email: z.string(),
  password: z.string(),
});
// import { users } from "@/db/schema.ts";
import { Response, Request, NextFunction } from "express";
// import { CustomError } from "../lib/custom-error.ts";
// import { validationResult } from "express-validator";


export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {

    try {
        
        const values = req.body;
    
        // Validate the request body
        const parsedValues = schema.parse(values);
        
        const allUser = await db.select().from(users)
            .where(eq(users.email, values.email));

        const existingUser = allUser[0];
   
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!existingUser.password) {
            return res.status(400).json({ message: "User not found" });
        }
        let isValidPassword = false;
        try {
            isValidPassword = await argon2.verify(
                existingUser.password,
                parsedValues.password
            );
        } catch (verifyError) {
            console.error("Error during password verification:", verifyError);
            return res.status(500).json({ message: "Error verifying password" });
        }


      
        if (!isValidPassword) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }

        if (!existingUser.emailVerified) {
            return res.status(400).json({ message: "Email not verified" });
        }

    

        const session = await lucia.createSession(existingUser.id, {
            expiresIn: 60 * 60 * 24 * 30,
        });

  

        const sessionCookie = lucia.createSessionCookie(session.id);

        res.cookie(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );



        const { password, ...userWithoutPassword } = existingUser;
        
        if (session.id) {
            return res.status(200).json({
                session: {
                    id: session.id
                },
                user: userWithoutPassword,
                message: "Logged in successfully"
            });
        } else {
            return res.status(400).json({
                sessionId: session.id,
                message: "Failed login"
            });
        }
    } catch (error) {
        return res.status(500).json({ error:error,message: "Internal server error" });
    }
}
