import { Router } from 'express';
import { CreateUserController } from '../modules/user/controller/CreateUserController';
import { GetUserController } from '../modules/user/controller/GetUserController';
import { GetUserByUsernameController } from '../modules/user/controller/GetUserByUsernameController';
import { DeleteUserController } from '../modules/user/controller/DeleteUserController';
import { UpdateUserController } from '../modules/user/controller/UpdateUserController';

export const userRouter = Router();

userRouter.post('/', CreateUserController.handle);
userRouter.get('/:id', GetUserController.handle);
userRouter.get('/username/:username', GetUserByUsernameController.handle);
userRouter.delete('/:id', DeleteUserController.handle);
userRouter.put('/update/:id', UpdateUserController.handle);
