import { faker } from '@faker-js/faker';
import { prisma } from '../../../database/prisma';
import { createFakerUser } from '../../../utils/fakerUser';
import { UserRequest } from '../../user/interfaces/User';
import { UserRepository } from '../../user/repository/UserRepository';
import { LoginService } from './LoginService';

describe('Login service', () => {
  let userRepository: UserRepository;
  let loginService: LoginService;
  let fakerUser: UserRequest;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    userRepository = new UserRepository();
    loginService = new LoginService(userRepository);
    fakerUser = createFakerUser();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should return a auth token', async () => {
    const user = await userRepository.create(fakerUser);

    const { email, password } = user;

    const login = await loginService.execute(email, password);

    expect(login).toHaveProperty('token');
    expect(typeof login.token === 'string');
  });

  it('should return an error if email or password is incorrect', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await expect(loginService.execute(email, password))
      .rejects
      .toThrowError('Ivalid credentials.');
  });
});
