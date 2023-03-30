"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModule = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const news_controller_1 = require("./news.controller");
const typeorm_1 = require("@nestjs/typeorm");
const news_entity_1 = require("../entity/news/news.entity");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const nestjs_telegram_1 = require("nestjs-telegram");
const config_1 = require("@nestjs/config");
let NewsModule = class NewsModule {
};
NewsModule = __decorate([
    (0, common_1.Module)({
        providers: [news_service_1.NewsService],
        controllers: [news_controller_1.NewsController],
        exports: [news_service_1.NewsService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([news_entity_1.News]),
            elasticsearch_1.ElasticsearchModule.registerAsync({
                useFactory: () => ({
                    node: "http://127.0.0.1:9200",
                })
            }),
            nestjs_telegram_1.TelegramModule.forRootAsync({
                useFactory: async (configService) => ({
                    botKey: configService.get(process.env.TELEGRAM_TOKEN)
                }),
                inject: [config_1.ConfigService]
            })
        ]
    })
], NewsModule);
exports.NewsModule = NewsModule;
//# sourceMappingURL=news.module.js.map