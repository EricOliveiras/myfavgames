import { UserRequest, UserResponse } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, { username, email, password, imageUrl }: UserRequest): Promise<UserResponse> {
    const getUserById = await this.userRepository.getOne(id);
    const getUserByUsername = await this.userRepository.getByUsername(username);

    if (!getUserById) {
      throw new Error('User not found.');
    }

    if (getUserByUsername && getUserByUsername.id !== id) {
      throw new Error('Username already registered.');
    }

    if(email !== getUserById.email) {
      throw new Error('Unable to update email.');
    }

    return await this.userRepository.update(id, {
      username,
      email,
      password,
      imageUrl
    });
  }
}
