import { Repository } from "typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { TelegramService } from "nestjs-telegram";
export declare class NewsService {
    private newsRepository;
    private readonly elasticsearchService;
    private readonly telegram;
    index: string;
    constructor(newsRepository: Repository<News>, elasticsearchService: ElasticsearchService, telegram: TelegramService);
    getAllNews(page: number): Promise<{
        news: News[];
        pagination: {
            currentPage: number;
            total: number;
            prevPage: number;
            nextPage: number;
            perPage: number;
        };
    }>;
    parseNews(): Promise<void>;
    addNews(data: any): Promise<any>;
    getNewsBody(url: string): Promise<string>;
    checkExist(title: string): Promise<boolean>;
    getOne(id: number): Promise<News>;
    searchNews(search: string): Promise<{}>;
    searchElastic(text: string): Promise<any[]>;
    indexNews(news: News): Promise<void>;
}
