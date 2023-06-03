import { Router } from 'express';

import { AuthController } from '../modules/authentication/controller/AuthController';

export const authRouter = Router();

authRouter.post('/', AuthController.handle);
