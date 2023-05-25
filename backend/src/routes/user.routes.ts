import { Router } from 'express';
import { CreateUserController } from '../modules/user/controller/CreateUserController';
import { GetUserController } from '../modules/user/controller/GetUserController';
import { GetUserByUsernameController } from '../modules/user/controller/GetUserByUsernameController';

export const userRouter = Router();

userRouter.post('/', CreateUserController.handle);
userRouter.get('/:id', GetUserController.handle);
userRouter.get('/username/:username', GetUserByUsernameController.handle);
