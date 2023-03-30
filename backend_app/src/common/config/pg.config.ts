import { registerAs } from "@nestjs/config";
import * as process from "process";
import * as path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";

export default registerAs("database", (): PostgresConnectionOptions => ({
            type: "postgres",
            //host: 'postgres',
            host: "localhost",
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)
            ],
            migrations: [
                path.resolve(`${__dirname}/../../db/migrations/**.{.ts,.js}`)
            ],
            migrationsTableName: "migrations",
            synchronize: false,
            logging: true,
            migrationsRun: true
        } as PostgresConnectionOptions
    )
);

// const config = new DataSource({
//     type: "postgres",
//     //host: process.env.DATABASE_HOSTNAME,
//     host: 'postgres',
//     port: Number(process.env.DATABASE_PORT),
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     entities: [
//         path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)
//     ],
//     migrations: [
//         path.resolve(`${__dirname}/../../db/migrations/*{.ts,.js}`)
//     ],
//     migrationsTableName: "migrations",
//     migrationsRun: true,
//     logging: true,
//     synchronize: false
// });

// export default config;
