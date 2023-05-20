import { randomUUID } from 'crypto';

import { UserRepository } from '../repository/UserRepository';
import { prisma } from '../../../database/prisma';
import { UserRequest } from '../interfaces/User';
import { CreateUser } from './CreateUser';
import { UpdateUser } from './UpdateUser';

describe('Update user', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;
  let updateUserService: UpdateUser;

  beforeAll(async () => {
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    updateUserService = new UpdateUser(userRepository);
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should return a user when it is updated', async () => {
    const userData: UserRequest = {
      username: 'updateUser',
      email: 'update@email.com',
      password: 'secret'
    };

    const userUpdateData: UserRequest = {
      username: 'updateUser',
      email: 'update@email.com',
      password: 'secret',
      imageUrl: '/images/image.png'
    };

    const user = await createUserService.execute(userData);

    const updateUser = await updateUserService.execute(user.id, userUpdateData);

    expect(updateUser.updatedAt > user.updatedAt);
  });

  it('should return an error if user not found', async () => {
    const id = randomUUID();

    const userUpdateData: UserRequest = {
      username: 'updateUser',
      email: 'update@email.com',
      password: 'secret',
      imageUrl: '/images/image.png'
    };

    await expect(updateUserService.execute(id, userUpdateData))
      .rejects
      .toThrowError('User not found.');
  });

  it('should throw a error if username already registered', async () => {
    const newUser: UserRequest = {
      username: 'newuser',
      email: 'newuserupdate@email.com',
      password: 'secret'
    };

    const newUserUpdate = await createUserService.execute(newUser);

    const userUpdateData: UserRequest = {
      username: 'updateUser',
      email: 'newuserupdate@email.com',
      password: 'secret',
      imageUrl: '/images/image.png'
    };

    await expect(updateUserService.execute(newUserUpdate.id, userUpdateData))
      .rejects
      .toThrowError('Username already registered.');
  });

  // it('should throw a error if email already registered', async () => {
  //   const userData: UserRequest = {
  //     username: 'Joe Doe',
  //     email: 'email@email.com',
  //     password: 'secret'
  //   };

  //   await expect(createUserService.execute(userData))
  //     .rejects
  //     .toThrowError('Email already registered.');
  // });
});
