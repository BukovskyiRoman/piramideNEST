import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { Role } from "../enum/role.enum";

@Injectable()
export class TaskService {
  constructor(private userService: UsersService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async bonusesProcessor() {
      const investors = await this.userService.getUsersByRole([Role.Investor]);

      investors.forEach( (investor) => {
          const profit = investor.balance / 100;
          this.userService.addProfit(profit, investor);
      })
  }
}
