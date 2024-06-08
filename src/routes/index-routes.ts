import { Router } from 'express';
import noteRoutes from '@/routes/notes-routes';
import {
 login
} from "../handlers/auth/loginHandler";
import { lucia } from '@/lib/lucia';
import { logout } from '@/handlers/auth/logoutHandler';
const router = Router();

//check login

router.use(async (req, res, next) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	if (!session) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	res.locals.session = session;
	res.locals.user = user;
	return next();
});
router.get('/', (req, res) => {
  if (res.locals.user) {
		
    return res.send(res.locals.user);
	}
  return res.send('Hello from TypeScript!');
});
router.post('/login', login);
router.post('/logout', logout);
router.use('/notes', noteRoutes);
export default router;