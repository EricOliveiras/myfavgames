import { Request, Response } from 'express';

import { AuthRequest } from '../interfaces/IAuth';
import { UserRepository } from '../../user/repository/UserRepository';
import { LoginService } from '../services/LoginService';

export const AuthController = {
  async handle(request: Request, response: Response) {
    const { email, password }: AuthRequest = request.body;

    const userRepository = new UserRepository();

    const loginService = new LoginService(userRepository);

    const { token } = await loginService.execute(email, password);

    return response.status(200).json({
      message: 'Logged in successfully',
      data: { token: token }
    });
  }
};
