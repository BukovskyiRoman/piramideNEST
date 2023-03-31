import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { News } from "../entity/news/news.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as process from "process";
import got from "got";
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Hears,
} from 'nestjs-telegraf';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

@Injectable()
export class NewsService {
    index = "news";

    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        private readonly elasticsearchService: ElasticsearchService,
        @InjectBot() private bot: Telegraf,
    ) {
    }

    async getAllNews(page: number) {
        const perPage: number = Number(process.env.REACT_APP_NEWS_PER_PAGE) ? Number(process.env.REACT_APP_NEWS_PER_PAGE): 5 ;
        const skip: number = (page - 1) * perPage;

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

        got(vgmUrl).then(async (response) => {
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

    /**
     * Method for adding news to db
     * @param data news data
     */
    async addNews(data) {
        await this.bot.telegram.sendMessage('260443983', `${data.title} <br> ${data.href}`)
        return await this.newsRepository.save(data);
    }

    async getNewsBody(url: string): Promise<string> {
        let body = got(url).then(async (response) => {
            const dom = new JSDOM(response.body);
            body = dom.window.document.querySelector(".content").textContent;
            return body.replace(/\s\s+/g, " ");
        }).catch(err => {
            console.log(err);
        });
        return body;
    }

    async checkExist(title: string): Promise<boolean> {
        const news = await this.newsRepository.findOne({
            where: {
                title
            }
        });
        return !news;
    }

    async getOne(id: number): Promise<News> {
        return await this.newsRepository.findOne({
            where: { id }
        });
    }

    async searchNews(search: string) {
        const result = {};
        let health;
        try {
            health = await this.elasticsearchService.cluster.health();
        } catch (e) {
            console.log(e.message);
        }

        if (health && (health.status === "yellow" || health.status === "green") && search.length) {
            console.log("elastic search");
            result["news"] = await this.searchElastic(search);
        } else {
            console.log("typeorm");
            result["news"] = await this.newsRepository.find({
                where: [
                    { title: Like(`%${search}%`) },
                    { body: Like(`%${search}%`) }
                ]
            });
        }
        return result;
    }

    async searchElastic(text: string) {
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
        } catch (e) {
            console.log(e.message);
        }
    }

    async indexNews(news: News) {
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
        } catch (e) {
            console.log(e.message);
        }
    }
}
