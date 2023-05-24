import { randomUUID } from 'crypto';

import { UserRequest, UserResponse } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';
import { createFakerUser } from '../../../utils/fakerUser';
import { prisma } from '../../../database/prisma';
import { CreateUser } from './CreateUser';
import { UpdateUser } from './UpdateUser';

describe('Update user', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;
  let updateUserService: UpdateUser;
  let user01: UserRequest;
  let user02: UserRequest;
  let createdUser01: UserResponse;
  let createdUser02: UserResponse;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    updateUserService = new UpdateUser(userRepository);

    user01 = createFakerUser();
    user02 = createFakerUser();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should return a user when it is updated', async () => {
    createdUser01 = await createUserService.execute(user01);

    user01.imageUrl = '/image/image.png';

    const updateUser = await updateUserService.execute(createdUser01.id, user01);

    expect(updateUser.updatedAt > createdUser01.updatedAt);
    expect(updateUser.imageUrl).toBe(user01.imageUrl);
  });

  it('should return an error if user not found', async () => {
    const id = randomUUID();

    await expect(updateUserService.execute(id, user01))
      .rejects
      .toThrowError('User not found.');
  });

  it('should throw a error if username already registered', async () => {
    const newUserData: UserRequest = {
      username: 'teste02',
      email: 'teste02@test.com',
      password: '123456'
    };

    await createUserService.execute(newUserData);

    const user = await createUserService.execute({
      username: 'teste01',
      email: 'teste01@test.com',
      password: '123456'
    });

    const id = user.id;

    await expect(updateUserService.execute(id, newUserData))
      .rejects
      .toThrowError('Username already registered.');
  });

  it('should return an error when trying to update the email', async () => {
    createdUser02 = await createUserService.execute(user02);

    user02.email = 'outro@email.com';

    await expect(updateUserService.execute(createdUser02.id, user02))
      .rejects
      .toThrowError('Unable to update email.');
  });
});
