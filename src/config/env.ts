import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  PORT: z.string().default('3000'),
  JWT_SECRET: z.string(),
  JWT_EXPIREIN: z.string().default('1d'),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
});

const env = envSchema.parse(process.env);

const configSchema = z.object({
  app: z.object({
    env: z.string(),
    port: z.union([z.string(), z.number()]),
    isProd: z.boolean(),
    isDev: z.boolean(),
    isStag: z.boolean(),
  }),
  jwt: z.object({
    secret: z.string(),
    expiresIn: z.string(),
  }),
  db: z.object({
    host: z.string(),
    port: z.string(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
  }),
});

const EnvConfig: z.infer<typeof configSchema> = configSchema.parse({
  app: {
    env: env.NODE_ENV,
    port: env.PORT,
    isProd: env.NODE_ENV === 'production',
    isDev: env.NODE_ENV === 'development',
    isStag: env.NODE_ENV === 'staging',
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIREIN,
  },
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
  },
});

export default EnvConfig as z.infer<typeof configSchema>;
