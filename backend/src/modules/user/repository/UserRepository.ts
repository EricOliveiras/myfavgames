import { User } from '@prisma/client';

import { IUserRepository } from '../interfaces/IUserRepository';
import { prisma as db } from '../../../database/prisma';
import { UserRequest } from '../interfaces/User';

export class UserRepository implements IUserRepository {
  async create({ username, email, password, imageUrl }: UserRequest): Promise<User> {
    return await db.user.create({
      data: {
        username,
        email,
        password,
        imageUrl
      }
    });
  }

  async getOne(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        id: id
      },
      include: {
        gameList: true
      }
    });
  }

  async getByUsername(username: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        username: username
      },
      include: {
        gameList: true
      }
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await db.user.findFirst({
      where: {
        email: email
      }
    });
  }

  async update(id: string, { username, email, password, imageUrl }: UserRequest): Promise<User> {
    return await db.user.update({
      where: {
        id: id
      },
      data: {
        username,
        email,
        password,
        imageUrl
      }
    });
  }

  async delete(id: string): Promise<void> {
    await db.user.delete({
      where: {
        id: id
      }
    });
  }

}
