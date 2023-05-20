import { UserRepository } from '../repository/UserRepository';
import { prisma } from '../../../database/prisma';
import { CreateUser } from './CreateUser';
import { UserRequest } from '../interfaces/User';
import { GetByUsername } from './GetByUsername';
import { createFakerUser } from '../../../utils/fakerUser';
import { faker } from '@faker-js/faker';

describe('Get user by username', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;
  let getByUsername: GetByUsername;
  let fakerUser: UserRequest;

  beforeAll(async () => {
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    getByUsername = new GetByUsername(userRepository);
    fakerUser = createFakerUser();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should return a user by username', async () => {
    const user = await createUserService.execute(fakerUser);

    const getUser = await getByUsername.execute(user.username);

    expect(getUser?.username).toBe(user.username);
  });

  it('should return an error if user not found', async () => {
    const username = faker.person.firstName();

    await expect(getByUsername.execute(username))
      .resolves
      .toBe(null);
  });
});
