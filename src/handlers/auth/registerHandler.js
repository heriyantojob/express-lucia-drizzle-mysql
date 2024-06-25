import express from 'express';
import { z } from 'zod';
import { db } from "@/db/setup";
import * as argon2 from "argon2";
import { emailVerificationTable, users } from '@/db/schema';
import { generateId } from 'lucia';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '@/lib/email';

const app = express();
app.use(express.json());

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
});


export async function register(
  req,
  res,

) {
    //const { email, password }:RequestBody = req.body;

    try {
        const values = schema.parse(req.body);

        // Hash the password
        const hashedPassword = await argon2.hash(values.password);
        const userId = generateId(15);

        // Insert the new user into the database
        await db.insert(users).values({
            id: userId,
            uid: uuidv4(),
            email: values.email,
            name: "TEs",
            password: hashedPassword,
        });

        // Generate a random code for email verification
        const code = Math.random().toString(36).substring(2, 8);

        // Insert the email verification record into the database
        await db.insert(emailVerificationTable).values({
            code,
            userId,
            id: generateId(15),
            sentAt: new Date(),
        });

        // Create a JWT token
        const token = jwt.sign(
            { email: values.email, userId, code },
            process.env.JWT_SECRET_KEY ,
            {
                expiresIn: "5m",
            }
        );

        // Generate the verification URL
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

        // Send the verification email
        try {
            await sendEmail({
                html: `<a href="${url}">Verify your email</a>`,
                subject: "Verify your email",
                to: values.email,
            });
        } catch (error) {
            return res.status(400).json({ message: error.message || "An error occurred" });
        }

        // Respond with success
        return res.json({ success: true, data: { userId } });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
