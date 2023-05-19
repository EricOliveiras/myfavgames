import { compareSync } from 'bcrypt';

import { UserRepository } from '../repository/UserRepository';
import { UserRequest } from '../interfaces/User';
import { CreateUser } from './CreateUser';
import { prisma } from '../../../database/prisma';

describe('Create user', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;

  beforeAll(async () => {
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const userData: UserRequest = {
      username: 'Joe Due',
      email: 'email@email.com',
      password: 'secret'
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty('id');
  });

  it('should throw a error if username already registered', async () => {
    const userData: UserRequest = {
      username: 'Joe Due',
      email: 'email@email.com',
      password: 'secret'
    };

    await expect(createUserService.execute(userData))
      .rejects
      .toThrowError('Username already registered.');
  });

  it('should throw a error if email already registered', async () => {
    const userData: UserRequest = {
      username: 'Joe Doe',
      email: 'email@email.com',
      password: 'secret'
    };

    await expect(createUserService.execute(userData))
      .rejects
      .toThrowError('Email already registered.');
  });

  it('should hash the password correctly', async () => {
    const userData: UserRequest = {
      username: 'user teste',
      email: 'test@email.com',
      password: 'secret'
    };

    const { password } = userData;

    const user = await createUserService.execute(userData);

    const isPasswordCorrect = compareSync(password, user.password);

    expect(password).not.toEqual(user.password);
    expect(isPasswordCorrect).toBe(true);
  });
});
