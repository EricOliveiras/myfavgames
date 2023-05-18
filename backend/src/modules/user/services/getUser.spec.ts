import { randomUUID } from 'crypto';

import { UserRepository } from '../repository/UserRepository';
import { prisma } from '../../../database/prisma';
import { UserRequest } from '../interfaces/User';
import { CreateUser } from './CreateUser';
import { GetUser } from './GetUser';
import { compareSync } from 'bcrypt';

describe('Get user', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;
  let getUserService: GetUser;

  beforeAll(async () => {
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    getUserService = new GetUser(userRepository);
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should get a user', async () => {
    const userData: UserRequest = {
      username: 'testusername',
      email: 'testeuser@email.com',
      password: 'secret'
    };

    const user = await createUserService.execute(userData);

    const getUser = await getUserService.execute(user.id);

    const isPasswordCorrect = compareSync(userData.password, user.password);

    expect(getUser?.id).toEqual(user.id);
    expect(getUser?.username).toEqual(user.username);
    expect(getUser?.email).toEqual(user.email);
    expect(isPasswordCorrect).toBe(true);
  });

  it('should throw return null if user not found', async () => {
    const id = randomUUID();

    await expect(getUserService.execute(id))
      .resolves
      .toEqual(null);
  });
});
