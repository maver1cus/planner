import * as Joi from 'joi';
import { EnvironmentVariablesInterface } from './types';

export const validationSchema: Joi.ObjectSchema<EnvironmentVariablesInterface> =
  Joi.object({
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    BACKEND_PORT: Joi.number().required(),
  });
