import { Controller, Get, Inject, Query, Req } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
    constructor(
        private newsService: NewsService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {
    }
    @Get()
    async getNews(@Query('page') page) {
        console.log(`page=${page}`);
        return await this.newsService.getAllNews(page ? page : 1)
    }

    @Get('/search')
    async searchNews(@Query('search') search) {
        return await this.newsService.searchNews(search)
    }
}
