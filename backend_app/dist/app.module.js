"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const schedule_1 = require("@nestjs/schedule");
const task_service_1 = require("./scheduler/task-service");
const transaction_module_1 = require("./transaction/transaction.module");
const invite_module_1 = require("./invite/invite.module");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const bull_1 = require("@nestjs/bull");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const process = require("process");
const emailExist_1 = require("./validation/rules/emailExist");
const admin_module_1 = require("./admin/admin.module");
const typeorm_1 = require("@nestjs/typeorm");
const pg_config_1 = require("./common/config/pg.config");
const typeorm_2 = require("typeorm");
const upload_module_1 = require("./upload/upload.module");
const news_module_1 = require("./news/news.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [pg_config_1.default]
            }),
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.File({
                        filename: "winston.log",
                        level: "error"
                    })
                ]
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => (Object.assign({}, configService.get("database"))),
                inject: [config_1.ConfigService],
                dataSourceFactory: async (options) => new typeorm_2.DataSource(options).initialize()
            }),
            bull_1.BullModule.forRootAsync({
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
            mailer_1.MailerModule.forRoot({
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
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            schedule_1.ScheduleModule.forRoot(),
            transaction_module_1.TransactionModule,
            invite_module_1.InviteModule,
            admin_module_1.AdminModule,
            upload_module_1.UploadModule,
            news_module_1.NewsModule
        ],
        controllers: [],
        providers: [
            task_service_1.TaskService,
            emailExist_1.IsUserAlreadyExistConstraint
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map