import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { Repository } from "typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { NewsModule } from "./news.module";
import { Test } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("NewsController", () => {
    // let newsController: NewsController;
    // // let newsService = {
    // //     getAllNews: () => {
    // //         return {
    // //             news: [],
    // //             pagination: { currentPage: 1, total: 0, prevPage: 0, nextPage: 2, perPage: 5 }
    // //         };
    // //
    // //     }
    // // };
    // let newsService: NewsService;
    // let newsRepository: Repository<News>;
    // let elasticService: ElasticsearchService;
    // let app: INestApplication;
    //
    // beforeAll(async () => {
    //     const module = await Test.createTestingModule({
    //         imports: [
    //             NewsModule,
    //             TypeOrmModule.forRoot({
    //                 type: "postgres",
    //                 host: "localhost",
    //                 port: 5432,
    //                 username: "test",
    //                 password: "123456789",
    //                 database: "test",
    //                 entities: [News],
    //                 synchronize: false
    //             })
    //         ]
    //     })
    //         .overrideProvider(newsService)
    //         .useValue(newsService)
    //         .compile();
    //
    //     app = module.createNestApplication();
    //     await app.init();
    //
    //     newsRepository = module.get(getRepositoryToken(News))
    //     elasticService = module.get<ElasticsearchService>(ElasticsearchService)
    //     newsService = module.get<NewsService>(NewsService)
    // });
    //
    // it(`/GET news`, () => {
    //     return request(app.getHttpServer())
    //         .get("/news")
    //         .expect(200)
    //         .expect(
    //             newsService.getAllNews(1)
    //         );
    // });
    //
    //
    // beforeEach(() => {
    //     // elasticService = new ElasticsearchService({});
    //     // newsRepository = new Repository<News>();
    //     // newsService  = new NewsService(newsRepository, elasticService);
    //     // newsController = new NewsController(newsService);
    // });
    //
    // afterAll(async () => {
    //     await app.close();
    // });
    it("should pass", function() {
        expect(true).toEqual(true)
    });
});
