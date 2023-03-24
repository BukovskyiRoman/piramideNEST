import { Logger } from "winston";
import { NewsService } from "./news.service";
export declare class NewsController {
    private newsService;
    private readonly logger;
    constructor(newsService: NewsService, logger: Logger);
    getNews(page: any): Promise<{
        news: import("../entity/news/news.entity").News[];
        pagination: {
            currentPage: number;
            total: number;
        };
    }>;
    searchNews(search: any): Promise<{}>;
}
