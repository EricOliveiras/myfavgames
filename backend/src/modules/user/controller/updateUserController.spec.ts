import request from 'supertest';

import { UserRepository } from '../repository/UserRepository';
import { createFakerUser } from '../../../utils/fakerUser';
import { CreateUser } from '../services/CreateUser';
import { prisma } from '../../../database/prisma';
import { UserRequest } from '../interfaces/User';
import { app } from '../../../config/server';

describe('Update user controller', () => {
  let userRepository: UserRepository;
  let createUser: CreateUser;
  let fakerUser: UserRequest;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    userRepository = new UserRepository();
    createUser = new CreateUser(userRepository);
    fakerUser = createFakerUser();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should update a user', async () => {
    const user = await createUser.execute(fakerUser);

    const { id, username, email, password } = user;

    const updateUser: UserRequest = {
      username,
      email,
      password,
      imageUrl: '/image/newpic.png'
    };

    const response = await request(app)
      .put(`/users/update/${id}`)
      .send(updateUser);

    expect(response.status).toBe(200);
  });
});
