import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';
import { GetByUsername } from '../services/GetByUsername';

export const GetUserByUsernameController = {
  async handle(request: Request, response: Response) {
    const { username } = request.params;

    const userRepository = new UserRepository();
    const getUserByUsername = new GetByUsername(userRepository);

    const user = await getUserByUsername.execute(username);

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
