import { NewsService } from "./news.service";
export declare class NewsController {
    private newsService;
    constructor(newsService: NewsService);
    getNews(page: any): Promise<{
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
