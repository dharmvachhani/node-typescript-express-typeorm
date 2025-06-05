import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  PORT: z.string().default('3000'),
  HOST: z.string().default('localhost'),
  JWT_SECRET: z.string(),
  JWT_EXPIREIN: z.string().default('1d'),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

const configSchema = z.object({
  isProd: z.boolean(),
  isDev: z.boolean(),
  isStag: z.boolean(),
  app: z.object({
    env: z.string(),
    port: z.union([z.string(), z.number()]),
    host: z.string(),
  }),
  jwt: z.object({
    secret: z.string(),
    expiresIn: z.string(),
  }),
  db: z.object({
    host: z.string(),
    port: z.number(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
    synchronize: z.boolean().default(false),
  }),
});

export const EnvConfig: z.infer<typeof configSchema> = configSchema.parse({
  isProd: env.NODE_ENV === 'production',
  isDev: env.NODE_ENV === 'development',
  isStag: env.NODE_ENV === 'staging',
  app: {
    env: env.NODE_ENV,
    host: env.HOST,
    port: env.PORT,
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
    synchronize: false
  },
});
