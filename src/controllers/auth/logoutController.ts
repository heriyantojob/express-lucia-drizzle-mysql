import express, { Request, Response } from 'express';
import { lucia } from '@/lib/lucia';
import { z } from 'zod';



// import { CustomError } from "../lib/custom-error.ts";
// import { validationResult } from "express-validator";


export async function logout(
  req: Request,
  res: Response,

) {

    if (!res.locals.session) {
		return res.status(401).end();
	}
	await lucia.invalidateSession(res.locals.session.id);
	 res
		.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize())
        return res.status(200).json({
			message: "Success logout"
		  });
}
