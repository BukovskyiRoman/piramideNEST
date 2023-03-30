import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import * as fs from "fs";
import { TelegramModule } from "nestjs-telegram";
import { ConfigService } from "@nestjs/config";

@Module({
    providers: [NewsService],
    controllers: [NewsController],
    exports: [NewsService],
    imports: [
        TypeOrmModule.forFeature([News]),
        ElasticsearchModule.registerAsync({
            useFactory: () => ({
                node: "http://127.0.0.1:9200",
            })}),
        TelegramModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                botKey: configService.get(process.env.TELEGRAM_TOKEN)
            }),
            inject: [ConfigService]
        })
    ]
})
export class NewsModule {
}
