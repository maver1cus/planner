export interface EnvironmentVariablesInterface {
  DATABASE_URL: string;
  BACKEND_PORT: number;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
}

export interface AppConfigInterface {
  databaseUrl: string;
  port: number;
  jwtAccessTokenSecret: string;
  jwtAccessTokenExpirationTime: number;
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpirationTime: number;
}
