import { Router } from 'express';
import { rootRouter } from './root.routes';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

export const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/', rootRouter);
