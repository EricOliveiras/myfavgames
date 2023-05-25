import { randomUUID } from 'crypto';
import request from 'supertest';

import { UserRequest, UserResponse } from '../interfaces/User';
import { UserRepository } from '../repository/UserRepository';
import { createFakerUser } from '../../../utils/fakerUser';
import { CreateUser } from '../services/CreateUser';
import { prisma } from '../../../database/prisma';
import { app } from '../../../config/server';

describe('Get user controller', () => {
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

  it('should return a user', async () => {
    const user = await createUserService.execute(fakerUser);

    const response = await request(app)
      .get(`/users/${user.id}`);

    const getUser: UserResponse = response.body.data;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User details retrieved successfully.');
    expect(response.body).toHaveProperty('data');
    expect(getUser).toBeDefined();
    expect(user).toHaveProperty('id');
    expect(getUser.username).toBe(user.username);
    expect(getUser.email).toBe(user.email);
  });

  it('should return an error if user not found', async () => {
    const id = randomUUID();

    const response = await request(app)
      .get(`/users/${id}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User not found.');
  });
});
