import { faker } from '@faker-js/faker';

import { UserRequest } from '../modules/user/interfaces/User';

export const createFakerUser = (): UserRequest => {
  const username = faker.person.firstName() + faker.person.lastName();
  const password = faker.internet.password();
  const email = faker.internet.email({ firstName: username.toLowerCase() });

  return {
    username,
    email,
    password
  };
};
