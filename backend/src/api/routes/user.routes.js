import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { getUsers } from "../controller/user.controller.js";

const userRouter = Router()

userRouter.get('/',authenticate,authorize('ADMIN'),getUsers);

export default userRouter;