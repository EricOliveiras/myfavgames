import { Request, Response } from 'express';

import { CreateUser } from '../services/CreateUser';
import { UserRequest } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';

export const CreateUserController = {
  async handle(request: Request, response: Response) {
    const { username, email, password, imageUrl }: UserRequest = request.body;

    const userRepository = new UserRepository();
    const createUserService = new CreateUser(userRepository);

    const createdUser = await createUserService.execute({
      username,
      email,
      password,
      imageUrl
    });

    return response.status(201).json({
      message: 'User successfully registered',
      data:createdUser
    });
  }
};
