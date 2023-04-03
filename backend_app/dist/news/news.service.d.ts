import { Repository } from "typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Telegraf } from 'telegraf';
export declare class NewsService {
    private newsRepository;
    private readonly elasticsearchService;
    private bot;
    index: string;
    constructor(newsRepository: Repository<News>, elasticsearchService: ElasticsearchService, bot: Telegraf);
    getAllNews(page: number, sort: boolean): Promise<{
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
