import { randomUUID } from 'crypto';
import request from 'supertest';

import { UserRepository } from '../repository/UserRepository';
import { createFakerUser } from '../../../utils/fakerUser';
import { CreateUser } from '../services/CreateUser';
import { prisma } from '../../../database/prisma';
import { UserRequest } from '../interfaces/User';
import { app } from '../../../config/server';

describe('Delete user controller', () => {
  let createUserService: CreateUser;
  let userRepository: UserRepository;
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

  it('should return status code 200 when user deleted', async () => {
    const user = await createUserService.execute(fakerUser);

    const response = await request(app)
      .delete(`/users/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Successfully deleted user.');
  });

  it('should return an error if user not found', async () => {
    const id = randomUUID();

    const response = await request(app)
      .delete(`/users/${id}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Something went wrong when trying to delete the user.');
  });
});
