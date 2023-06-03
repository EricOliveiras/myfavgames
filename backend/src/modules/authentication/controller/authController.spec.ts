import request from 'supertest';

import { UserRepository } from '../../user/repository/UserRepository';
import { CreateUser } from '../../user/services/CreateUser';
import { createFakerUser } from '../../../utils/fakerUser';
import { UserRequest } from '../../user/interfaces/User';
import { prisma } from '../../../database/prisma';
import { app } from '../../../config/server';

describe('Authenticate controller', () => {
  let userRepository: UserRepository;
  let createUserService: CreateUser;
  let fakerUser: UserRequest;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    userRepository = new UserRepository();
    createUserService = new CreateUser(userRepository);
    fakerUser = createFakerUser();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should return status code 200 when authenticating the user', async () => {
    const user = await createUserService.execute(fakerUser);

    const { email, password } = user;

    const response = await request(app)
      .post('/auth')
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('token');
  });
});
