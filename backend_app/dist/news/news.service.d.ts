import { Repository } from "typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
export declare class NewsService {
    private newsRepository;
    private readonly elasticsearchService;
    index: string;
    constructor(newsRepository: Repository<News>, elasticsearchService: ElasticsearchService);
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
    searchNews(search: string): Promise<{}>;
    searchElastic(text: string): Promise<any[]>;
    indexNews(news: News): Promise<void>;
}
