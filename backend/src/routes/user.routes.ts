import { Router } from 'express';
import { CreateUserController } from '../modules/user/controller/CreateUserController';

export const userRouter = Router();

userRouter.post('/', CreateUserController.handle);
