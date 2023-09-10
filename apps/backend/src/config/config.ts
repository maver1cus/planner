import * as dotenv from 'dotenv';

dotenv.config();

const {
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  BACKEND_PORT,
} = (process || {}).env;

export {
  BACKEND_PORT,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  JWT_SECRET,
};
