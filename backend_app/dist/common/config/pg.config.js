"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const process = require("process");
const path = require("path");
exports.default = (0, config_1.registerAs)("database", () => ({
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
        path.resolve(`${__dirname}/../../db/migrations/**.{.ts,.js}`)
    ],
    migrationsTableName: "migrations",
    synchronize: false,
    logging: true,
    migrationsRun: true
}));
//# sourceMappingURL=pg.config.js.map