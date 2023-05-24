import { Router } from 'express';
import { rootRouter } from './root.routes';
import { userRouter } from './user.routes';

export const routes = Router();

routes.use('/users', userRouter);
routes.use('/', rootRouter);
