import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import { IUserRepository } from '../interfaces/IUserRepository';
import { HttpException } from '../../../errors/HttpException';
import { saltRounds } from '../../../config/vars';
import { UserRequest } from '../interfaces/User';

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ username, email, password, imageUrl }: UserRequest): Promise<User> {
    const checkIfUsernameExist = !!await this.userRepository.getByUsername(username);
    const checkIfEmailExist = !!await this.userRepository.getByEmail(email);

    if (checkIfUsernameExist) {
      throw new HttpException(409, 'Username already registered.');
    }

    if (checkIfEmailExist) {
      throw new HttpException(409, 'Email already registered.');
    }

    const hashPassword = await hash(password, saltRounds);

    return await this.userRepository.create({
      username,
      email,
      password: hashPassword,
      imageUrl
    });
  }
}
