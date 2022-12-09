import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as session from 'express-session';
import { PassportModule } from '@nestjs/passport';
import Redis from 'ioredis';
import * as ConnectRedis from 'connect-redis';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  PassportModule.register({ session: true });

  const config = new DocumentBuilder()
    .setTitle('WWW title')
    .setDescription('WWW app description')
    .setVersion('1.0')
    .addTag('www')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log('Server has started');
  });
}

bootstrap();
