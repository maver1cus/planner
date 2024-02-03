import * as Joi from 'joi';
import { EnvironmentVariablesInterface } from './types';

export const validationSchema: Joi.ObjectSchema<EnvironmentVariablesInterface> =
  Joi.object({
    DATABASE_URL: Joi.string().required(),
    BACKEND_PORT: Joi.number().required(),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
  });
