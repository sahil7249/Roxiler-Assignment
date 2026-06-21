import { Router } from 'express'
import { login, register, updatePassword } from '../controller/user.controller.js';
import { createUserSchema, updateUserSchema } from '../validators/users.validators.js';
import { validateRequest } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const authRouter = Router();
authRouter.post('/register', validateRequest(createUserSchema), register)
authRouter.post('/login', login)
authRouter.patch('/:id/update-password', authenticate,validateRequest(updateUserSchema),updatePassword)

export default authRouter;