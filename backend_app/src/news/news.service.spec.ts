import { NewsService } from "./news.service";
import { createConnection, getConnection, getRepository, Repository } from "typeorm";
import { News } from "../entity/news/news.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { User } from "../entity/user/user.entity";
import { INestApplication } from "@nestjs/common";
import { Telegraf } from "telegraf";
import { TelegrafModule } from "nestjs-telegraf";
import { agent } from "supertest";
import process from "process";
import * as http from "http";
const { createMock } = require('telegraf-test');

describe("NewsService", () => {
    let newsService: NewsService;
    let repository: Repository<User>;
    let testingModule: TestingModule;
    let elasticService: ElasticsearchService;
    let app: INestApplication;
    let bot:  Telegraf;

    beforeEach(async () => {
        const currentDate = new Date().toISOString();

        testingModule = await Test.createTestingModule({
            providers: [
                NewsService,
                ElasticsearchService,
                Telegraf,
                {
                    provide: getRepositoryToken(News),
                    useValue: {
                        count: jest.fn().mockResolvedValue(99),
                        find: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockImplementation((id) => {
                            return {
                                id: id.where.id,
                                body: "body",
                                title: "title",
                                http: "www",
                                source: "site",
                                date: currentDate
                            };

                        })
                    }
                },
                {
                    provide: ElasticsearchService,
                    useValue: {
                        getElasticSearchData: jest.fn()
                    }
                }
            ],
            imports: [
                TypeOrmModule.forRoot({
                    type: "postgres",
                    host: "localhost",
                    port: 5432,
                    username: "test",
                    password: "123456789",
                    database: "unit",
                    entities: [News],
                    autoLoadEntities: true
                }),
                TelegrafModule.forRoot({
                    token: '451572208:AAH0n2cIwjvNwvOVWYZ-lCUB0BIPM9XcSUY'
                })
            ]
        })
            .overrideProvider(Telegraf)
            .useValue(true)
            .compile();

        repository = testingModule.get(getRepositoryToken(News));
        elasticService = testingModule.get<ElasticsearchService>(ElasticsearchService);
        newsService = testingModule.get<NewsService>(NewsService);
       // bot = new Telegraf('451572208:AAH0n2cIwjvNwvOVWYZ-lCUB0BIPM9XcSUY', { telegram: { } })

        app = testingModule.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await testingModule.close();
    });

    it("should be defined", () => {
        expect(testingModule).toBeDefined();
    });

    describe("NewsService", () => {
        it("should get news", async () => {
            const page = 1;
            const { news, pagination } = await newsService.getAllNews(page);
            expect(page).toEqual(pagination.currentPage);
            expect(page + 1).toEqual(pagination.nextPage);
            expect(page - 1).toEqual(pagination.prevPage);
            expect([]).toEqual(news);
        });

        it("should get one", async () => {
            const searchId = Math.random();
            const { id, date } = await newsService.getOne(searchId);
            expect(searchId).toEqual(id);
            expect(date).toEqual(date);
        });
    });
});
