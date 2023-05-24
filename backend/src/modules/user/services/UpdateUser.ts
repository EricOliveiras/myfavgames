import { UserRequest, UserResponse } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';
import { HttpException } from '../../../errors/HttpException';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, { username, email, password, imageUrl }: UserRequest): Promise<UserResponse> {
    const getUserById = await this.userRepository.getOne(id);
    const getUserByUsername = await this.userRepository.getByUsername(username);

    if (!getUserById) {
      throw new HttpException(404, 'User not found.');
    }

    if (getUserByUsername && getUserByUsername.id !== id) {
      throw new HttpException(409, 'Username already registered.');
    }

    if(email !== getUserById.email) {
      throw new HttpException(403, 'Unable to update email.');
    }

    return await this.userRepository.update(id, {
      username,
      email,
      password,
      imageUrl
    });
  }
}
