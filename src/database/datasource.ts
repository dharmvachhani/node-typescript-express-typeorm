import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { EnvConfig } from '@config';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: EnvConfig.db.host,
    port: EnvConfig.db.port,
    username: EnvConfig.db.username,
    password: EnvConfig.db.password,
    database: EnvConfig.db.database,
    synchronize: EnvConfig.db.synchronize,
    logging: false,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
    subscribers: [],
});
