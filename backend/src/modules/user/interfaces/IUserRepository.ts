import { UserRequest, UserResponse } from './User';

export interface IUserRepository {
  create({ username, email, password, imageUrl }: UserRequest):Promise<UserResponse>;
  getOne(id: string): Promise<UserResponse | null>;
  getByUsername(username: string): Promise<UserResponse | null>;
  getByEmail(email: string): Promise<UserResponse | null>;
  update(id: string, { username, email, password, imageUrl }: UserRequest):Promise<UserResponse>;
  delete(id: string): Promise<void>;
}
