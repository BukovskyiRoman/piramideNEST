import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as session from "express-session";
import { PassportModule } from "@nestjs/passport";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import * as cookieParser from "cookie-parser";
import * as process from "process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    });

    //app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.use(helmet());

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.use(
        session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false
            // cookie: {
            //     sameSite: true,
            //     httpOnly: false,
            //     maxAge: 60*60
            // }
        })
    );

    PassportModule.register({ session: true });

    const config = new DocumentBuilder()
        .setTitle("WWW title")
        .setDescription("WWW app description")
        .setVersion("1.0")
        .addTag("www")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const port = process.env.PORT || 5000;

    await app.listen(port, () => {
        console.log(`Server has started on port: ${port}`);
    });
}

bootstrap();
