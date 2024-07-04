import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteUser, getUser, getUserTasks, updateUser } from "../controllers/user.controller.js";




const userRouter = Router();

userRouter.route('/update/:id').post(verifyJWT, updateUser);
userRouter.route('/delete/:id').delete(verifyJWT, deleteUser);
userRouter.route('/tasks/:id').get(verifyJWT, getUserTasks);
userRouter.route('/:id').get(verifyJWT, getUser);




export default userRouter;