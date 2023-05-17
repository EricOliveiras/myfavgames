import { User } from '@prisma/client';

export interface UserRequest {
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
}

export type UserResponse = User;
