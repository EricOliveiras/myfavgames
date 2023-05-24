import { randomUUID } from 'crypto';

import { UserRepository } from '../repository/UserRepository';
import { createFakerUser } from '../../../utils/fakerUser';
import { prisma } from '../../../database/prisma';
import { UserRequest } from '../interfaces/User';
import { CreateUser } from './CreateUser';
import { DeleteUser } from './DeleteUser';
import { GetUser } from './GetUser';

describe('Delete user', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;
  let deleteUserService: DeleteUser;
  let getUserService: GetUser;
  let fakerUser: UserRequest;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    deleteUserService = new DeleteUser(userRepository);
    getUserService = new GetUser(userRepository);
    fakerUser = createFakerUser();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should delete a user', async () => {
    const user: UserRequest = fakerUser;

    const createUser = await createUserService.execute(user);

    await deleteUserService.execute(createUser.id);

    await expect(getUserService.execute(createUser.id))
      .resolves
      .toBe(null);
  });

  it('should return an error if user not found', async () => {
    const id = randomUUID();

    await expect(deleteUserService.execute(id))
      .rejects
      .toThrowError('User not found.');
  });
});
