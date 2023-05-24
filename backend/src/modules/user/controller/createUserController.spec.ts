import request from 'supertest';
import { prisma } from '../../../database/prisma';
import { UserRequest, UserResponse } from '../interfaces/User';
import { app } from '../../../config/server';

describe('User controller', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const mockUser: UserRequest = {
      username: 'ericdiego',
      email: 'ericdiego@email.com',
      password: '12333456'
    };

    const response = await request(app)
      .post('/users')
      .send(mockUser)
      .set('Accept', 'application/json');

    const user: UserResponse = response.body.data;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User successfully registered');
    expect(response.body).toHaveProperty('data');
    expect(user).toBeDefined();
    expect(user).toHaveProperty('id');
    expect(user.username).toBe(mockUser.username);
    expect(user.email).toBe(mockUser.email);
  });
});
