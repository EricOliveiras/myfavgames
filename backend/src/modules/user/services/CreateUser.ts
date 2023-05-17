import { User } from '@prisma/client';
import { hash } from 'bcrypt';

import { IUserRepository } from '../interfaces/IUserRepository';
import { UserRequest } from '../interfaces/User';
import { saltRounds } from '../../../config/vars';

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ username, email, password, imageUrl }: UserRequest): Promise<User> {
    const checkIfUsernameExist = await this.userRepository.getByUsername(username);
    const checkIfEmailExist = await this.userRepository.getByEmail(email);

    if (checkIfUsernameExist) {
      throw new Error('Username already registered.');
    }

    if (checkIfEmailExist) {
      throw new Error('Email already registered.');
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
