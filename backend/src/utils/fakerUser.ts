import { faker } from '@faker-js/faker';

import { UserRequest } from '../modules/user/interfaces/User';

const usedUsernames: Set<string> = new Set();
const usedEmails: Set<string> = new Set();

export const createFakerUser = (): UserRequest => {
  let username: string;
  let email: string;

  do {
    username = faker.person.firstName().toLowerCase();
  } while (usedUsernames.has(username));

  usedUsernames.add(username);

  do {
    email = faker.person.firstName().toLowerCase();
  } while (usedEmails.has(email));

  usedEmails.add(email);

  const password = faker.internet .password().toLowerCase();

  return {
    username,
    email,
    password
  };
};
