import { Logger } from "winston";
import { NewsService } from "./news.service";
export declare class NewsController {
    private newsService;
    private readonly logger;
    constructor(newsService: NewsService, logger: Logger);
    getNews(page: any, sort: any): Promise<{
        news: import("../entity/news/news.entity").News[];
        pagination: {
            currentPage: number;
            total: number;
            prevPage: number;
            nextPage: number;
            perPage: number;
        };
    }>;
    searchNews(search: any): Promise<{}>;
    getOne(params: any): Promise<{
        news: import("../entity/news/news.entity").News;
    }>;
}
