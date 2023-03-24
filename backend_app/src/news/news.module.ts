import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import * as fs from "fs";

@Module({
    providers: [NewsService],
    controllers: [NewsController],
    exports: [NewsService],
    imports: [
        TypeOrmModule.forFeature([News]),
        ElasticsearchModule.registerAsync({
            useFactory: () => ({
                node: "http://127.0.0.1:9200",
                // auth: {
                //     password: "XWAUWT++hSClS8MyLAwS",
                //     username: "elastic",
                // },
            })})
    ]
})
export class NewsModule {
}
