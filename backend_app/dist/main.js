"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const session = require("express-session");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const cookieParser = require("cookie-parser");
const process = require("process");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    });
    app.use((0, helmet_1.default)());
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
    passport_1.PassportModule.register({ session: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("WWW title")
        .setDescription("WWW app description")
        .setVersion("1.0")
        .addTag("www")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    const port = process.env.PORT || 5000;
    await app.listen(port, () => {
        console.log(`Server has started on port: ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map