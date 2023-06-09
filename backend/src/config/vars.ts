import * as dotenv from 'dotenv';

dotenv.config();

const port = <string>process.env.PORT || '5555';
const saltRoundsEnv = <string>process.env.SALT_ROUNDS;
const saltRounds = parseInt(saltRoundsEnv);
const jwtSecret = <string>process.env.JTW_SECRET;

export {
  port,
  saltRounds,
  jwtSecret
};
