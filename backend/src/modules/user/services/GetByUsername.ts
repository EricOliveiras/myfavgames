import { UserRepository } from '../repository/UserRepository';
import { HttpException } from '../../../errors/HttpException';
import { UserResponse } from '../interfaces/User';

export class GetByUsername {
  constructor(private userRepository: UserRepository) {}

  public async execute(username: string): Promise<UserResponse | null> {
    const user = this.userRepository.getByUsername(username);

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    return user;
  }
}
