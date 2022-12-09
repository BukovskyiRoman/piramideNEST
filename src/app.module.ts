import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './scheduler/task-service';
import { TransactionModule } from './transaction/transaction.module';
import { InviteModule } from './invite/invite.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as process from 'process';
import { IsUserAlreadyExistConstraint } from './validation/rules/emailExist';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        // new winston.transports.Console({
        //     level: 'info'
        // }),
        new winston.transports.File({
          filename: 'winston.log',
          level: 'error',
        }),
      ],
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gaxbeor.mongodb.net/?retryWrites=true&w=majority`,
    ),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
        limiter: {
          max: 1,
          duration: 1000 * 30,
        },
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
    TransactionModule,
    InviteModule,
    AdminModule,
  ],
  controllers: [],
  providers: [TaskService, IsUserAlreadyExistConstraint],
})
export class AppModule {}
