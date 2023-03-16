"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path = require("path");
const typeorm_1 = require("typeorm");
const config = new typeorm_1.DataSource({
    type: "postgres",
    host: 'postgres',
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)
    ],
    migrations: [
        path.resolve(`${__dirname}/../../db/migrations/*{.ts,.js}`)
    ],
    migrationsTableName: "migrations",
    migrationsRun: true,
    logging: true,
    synchronize: false
});
exports.default = config;
//# sourceMappingURL=ormconfigMigration.js.map