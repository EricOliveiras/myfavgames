import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '../../user/repository/UserRepository';
import { HttpException } from '../../../errors/HttpException';
import { AuthResponse } from '../interfaces/IAuth';
import { jwtSecret } from '../../../config/vars';

export class LoginService {
  constructor(
    private userRepository: UserRepository
  ) {}

  public async execute(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.getByEmail(email);

    if (!user || compareSync(password, user.password)) {
      throw new HttpException(401, 'Ivalid credentials.');
    }

    const token = sign(
      { userId: user.id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      token: token
    };
  }
}
