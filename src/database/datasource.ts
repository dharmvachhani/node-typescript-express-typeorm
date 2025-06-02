import "reflect-metadata";
import { DataSource } from "typeorm";
import EnvConfig  from "@config/env";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: EnvConfig.db.host,
    port: Number(EnvConfig.db.port),
    username: EnvConfig.db.username,
    password: EnvConfig.db.password,
    database: EnvConfig.db.database,
    synchronize: true,
    logging: false,
    entities: ["./**/*.entity.ts"],
    migrations: ["./migrations"],
    subscribers: [],
});