import { UserResponse } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';

export class GetByUsername {
  constructor(private userRepository: UserRepository) {}

  public async execute(username: string): Promise<UserResponse | null> {
    const user = this.userRepository.getByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
