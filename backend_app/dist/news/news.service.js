"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const news_entity_1 = require("../entity/news/news.entity");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const process = require("process");
const got_1 = require("got");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let NewsService = class NewsService {
    constructor(newsRepository, elasticsearchService, bot) {
        this.newsRepository = newsRepository;
        this.elasticsearchService = elasticsearchService;
        this.bot = bot;
        this.index = "news";
    }
    async getAllNews(page) {
        const perPage = Number(process.env.REACT_APP_NEWS_PER_PAGE) ? Number(process.env.REACT_APP_NEWS_PER_PAGE) : 5;
        const skip = (page - 1) * perPage;
        const total = await this.newsRepository.count();
        const news = await this.newsRepository.find({
            order: {
                date: "DESC"
            },
            take: perPage,
            skip
        });
        return {
            news,
            pagination: {
                currentPage: page ? page : 1,
                total,
                prevPage: Number(page) - 1,
                nextPage: Number(page) + 1,
                perPage
            }
        };
    }
    async parseNews() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const vgmUrl = `https://gre4ka.info/news/${year}/${month}/${day}`;
        (0, got_1.default)(vgmUrl).then(async (response) => {
            const dom = new JSDOM(response.body);
            const news = dom.window.document.querySelectorAll(".item");
            for (const item of news) {
                const time = item.querySelector(".mytime").textContent;
                const href = item.querySelector("a").href;
                const title = item.querySelector("a").textContent;
                if (await this.checkExist(title)) {
                    const data = await this.addNews({
                        source: "Grechka",
                        title,
                        body: await this.getNewsBody(href),
                        href,
                        date: Date.parse(`${time} ${year}/${month}/${day}`)
                    });
                    await this.indexNews(data);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }
    async addNews(data) {
        await this.bot.telegram.sendMessage('260443983', `${data.title} <br> ${data.href}`);
        return await this.newsRepository.save(data);
    }
    async getNewsBody(url) {
        let body = (0, got_1.default)(url).then(async (response) => {
            const dom = new JSDOM(response.body);
            body = dom.window.document.querySelector(".content").textContent;
            return body.replace(/\s\s+/g, " ");
        }).catch(err => {
            console.log(err);
        });
        return body;
    }
    async checkExist(title) {
        const news = await this.newsRepository.findOne({
            where: {
                title
            }
        });
        return !news;
    }
    async getOne(id) {
        return await this.newsRepository.findOne({
            where: { id }
        });
    }
    async searchNews(search) {
        const result = {};
        let health;
        try {
            health = await this.elasticsearchService.cluster.health();
        }
        catch (e) {
            console.log(e.message);
        }
        if (health && (health.status === "yellow" || health.status === "green") && search.length) {
            console.log("elastic search");
            result["news"] = await this.searchElastic(search);
        }
        else {
            console.log("typeorm");
            result["news"] = await this.newsRepository.find({
                where: [
                    { title: (0, typeorm_2.Like)(`%${search}%`) },
                    { body: (0, typeorm_2.Like)(`%${search}%`) }
                ]
            });
        }
        return result;
    }
    async searchElastic(text) {
        try {
            const response = await this.elasticsearchService.search({
                index: this.index,
                query: {
                    multi_match: {
                        query: text,
                        fields: ["title", "body"]
                    }
                }
            });
            const news = [];
            for (const item of response.hits.hits) {
                news.push({
                    title: item._source["title"],
                    body: item._source["body"],
                    source: item._source["source"],
                    date: item._source["date"],
                    href: item._source["href"]
                });
            }
            return news;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async indexNews(news) {
        try {
            await this.elasticsearchService.index({
                index: this.index,
                document: {
                    id: news.id,
                    title: news.title,
                    body: news.body,
                    source: news.source,
                    data: news.date
                }
            });
        }
        catch (e) {
            console.log(e.message);
        }
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_entity_1.News)),
    __param(2, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        elasticsearch_1.ElasticsearchService,
        telegraf_1.Telegraf])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map