import { Router } from "express";
import { changePassword, login, register } from "../controller/auth.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.put('/change-password',authenticate,changePassword)

export default authRouter;