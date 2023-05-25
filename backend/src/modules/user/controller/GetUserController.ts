import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';
import { GetUser } from '../services/GetUser';

export const GetUserController = {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = new UserRepository();
    const getUserService = new GetUser(userRepository);

    const user = await getUserService.execute(id);

    if (!user) {
      return response.status(400).json({
        message: 'User not found.'
      });
    }

    return response.status(200).json({
      message: 'User details retrieved successfully.',
      data: user
    });
  }
};
