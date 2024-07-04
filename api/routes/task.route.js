import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, deleteUserTask, getTask, updateUserTask } from "../controllers/task.controller.js";





const taskRouter = Router();


taskRouter.route('/create').post(verifyJWT, createTask)
taskRouter.route('/delete/:id').delete(verifyJWT, deleteUserTask)
taskRouter.route('/update/:id').post(verifyJWT, updateUserTask)
taskRouter.route('/get/:id').get(getTask)



export default taskRouter;