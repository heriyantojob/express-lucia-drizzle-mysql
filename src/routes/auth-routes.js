import { Router } from "express";
import {
    login
} from "../handlers/auth/loginHandler";
import { logout } from '@/handlers/auth/logoutHandler';
import userMiddleware from "../middleware/userMiddleware";

const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.use('/protect', userMiddleware, (req, res) => {
    res.send('This is a protected route');
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
