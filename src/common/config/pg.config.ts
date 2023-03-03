import { registerAs } from "@nestjs/config";
import * as process from "process";
import * as path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export default registerAs("database", (): PostgresConnectionOptions => ({
            type: "postgres",
            //host: 'postgres',
            host: "localhost",
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)
            ],
            // migrations: [
            //     path.resolve(`${__dirname}/../../db/migrations/**.{.ts,.js}`)
            // ],
            // migrationsTableName: "migrations",
            synchronize: false,
            logging: true
        } as PostgresConnectionOptions
    )
);
