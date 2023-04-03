import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { TelegrafModule } from 'nestjs-telegraf';
import * as process from "process";

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
        TelegrafModule.forRoot({
            //token: process.env.TELEGRAM_TOKEN,
            token: '451572208:AAH0n2cIwjvNwvOVWYZ-lCUB0BIPM9XcSUY'
        })
    ]
})
export class NewsModule {
}
