import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const authRouter = Router();

authRouter.route('/sign-up').post(signup);
authRouter.route('/log-in').post(login);
authRouter.route('/logout').post(verifyJWT, logout);




export default authRouter;