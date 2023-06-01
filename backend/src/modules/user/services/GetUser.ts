import { UserRepository } from '../repository/UserRepository';
import { HttpException } from '../../../errors/HttpException';
import { UserResponse } from '../interfaces/User';

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<UserResponse | null> {
    const user = this.userRepository.getOne(id);

    if (!user) {
      throw new HttpException(400, 'User not found.');
    }

    return user;
  }
}
