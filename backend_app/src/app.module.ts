import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskService } from "./scheduler/task-service";
import { TransactionModule } from "./transaction/transaction.module";
import { InviteModule } from "./invite/invite.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as process from "process";
import { IsUserAlreadyExistConstraint } from "./validation/rules/emailExist";
import { AdminModule } from "./admin/admin.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import pgconfig from "./common/config/pg.config";
import { DataSource } from "typeorm";
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [pgconfig]
        }),
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: "winston.log",
                    level: "error"
                })
            ]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({...configService.get("database")}),
            inject: [ConfigService],
            dataSourceFactory: async (options) => new DataSource(options).initialize()
        }),
        BullModule.forRootAsync({
            useFactory: () => ({
                redis: {
                    host: "localhost",
                    port: 6000
                },
                limiter: {
                    max: 1,
                    duration: 1000 * 30
                }
            })
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            },
            defaults: {
                from: "\"nest-modules\" <modules@nestjs.com>"
            }
        }),
        AuthModule,
        UsersModule,
        ScheduleModule.forRoot(),
        TransactionModule,
        InviteModule,
        AdminModule,
        UploadModule,
        NewsModule
    ],
    controllers: [],
    providers: [
        TaskService,
        IsUserAlreadyExistConstraint
    ]
})
export class AppModule {
}
