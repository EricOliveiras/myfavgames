import { UserResponse } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<UserResponse | null> {
    const user = this.userRepository.getOne(id);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}
