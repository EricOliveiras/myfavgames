import { HttpException } from '../../../errors/HttpException';
import { UserRepository } from '../repository/UserRepository';

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<void> {
    const getUser = !!await this.userRepository.getOne(id);

    if (!getUser) {
      throw new HttpException(404, 'User not found.');
    }

    await this.userRepository.delete(id);
  }
}
