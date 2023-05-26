import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';
import { DeleteUser } from '../services/DeleteUser';

export const DeleteUserController = {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userRepository = new UserRepository();
      const deleteUserService = new DeleteUser(userRepository);

      await deleteUserService.execute(id);

      return response.status(200).json({
        message: 'Successfully deleted user.'
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Something went wrong when trying to delete the user.'
      });
    }
  }
};
