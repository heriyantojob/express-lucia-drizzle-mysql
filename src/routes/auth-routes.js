import { Router } from "express";
import { v7 as uuid } from 'uuid';
import {
    login
} from "../controllers/auth/loginController";
import { logout } from '@/controllers/auth/logoutController';
import userMiddleware from "../middleware/userMiddleware";
import { generateIdFromEntropySize } from "lucia";
import { register } from "@/controllers/auth/registerController";
const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/register', register);
authRouter.use('/protect', userMiddleware, (req, res) => {
    res.send('This is a protected route');
});

authRouter.get('/generate-id', (req, res) => {
    res.send(generateIdFromEntropySize(2));
	res.send(uuid());
	
});
authRouter.get('/session', (req, res) => {
	if (res.locals.user) {
		return res.status(200).json({

				user:res.locals.user,
				session:res.locals.session	
		});
	}
  

  return res.status(200).json({ message:"not login" });

});
export default authRouter;
