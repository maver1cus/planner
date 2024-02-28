export interface EnvironmentVariablesInterface {
  JWT_SECRET: string;
  DATABASE_URL: string;
  BACKEND_PORT: number;
}

export interface AppConfigInterface {
  jwtSecret: string;
  databaseUrl: string;
  port: number;
}
