import { Request, Response } from 'express';
import { UserRequest } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';
import { UpdateUser } from '../services/UpdateUser';

export const UpdateUserController = {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { username, email, password, imageUrl }: UserRequest = request.body;

    const userRepository = new UserRepository();
    const updateUserService = new UpdateUser(userRepository);

    const updatedUser = await updateUserService.execute(id, {
      username,
      email,
      password,
      imageUrl
    });

    return response.status(200).json({
      message: 'User updated successfully',
      data:updatedUser
    });
  }
};
