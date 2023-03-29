import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UsersService } from "../users/users.service";
import { Role } from "../enum/role.enum";
import { NewsService } from "../news/news.service";

@Injectable()
export class TaskService {
    constructor(
        private userService: UsersService,
        private readonly newsService: NewsService
    ) {
    }

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async bonusesProcessor() {
        const investors = await this.userService.getUsersByRole([Role.Investor]);

        investors.forEach((investor) => {
            const profit = investor.balance / 100;
            this.userService.addProfit(profit, investor);
        });
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async parseNews() {
        await this.newsService.parseNews();
    }
}
