import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { TransactionService } from '../transaction/transaction.service';
import { Role } from '../enum/role.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private transactionService: TransactionService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async onModuleInit() {
    try {
      const res = await this.userModel.find(); // this method returns user data exist in database (if any)
      if (res.length === 0) {
        const newUser = {
          first_name: 'Admin',
          last_name: 'Adminovich',
          password: '12345678',
          email: 'adminmail@gmail.com',
          roles: [Role.Admin],
          balance: 0,
        };
        const user = await this.userModel.create(newUser); // this method creates admin user in database
      }
    } catch (error) {
      this.logger.error(error.message());
      throw error;
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(userData);
    await user.save({ timestamps: { createdAt: true, updatedAt: true } });
    return user;
  }

  async getUsersByRole(role: Role[]): Promise<User[]> {
    return this.userModel
      .find({ roles: role })
      .populate('transactions')
      .populate('invites');
    //.select('-password');
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel
      .findById(id)
      .populate('invites')
      .populate('transactions');
    //.select("-password");
  }

  async findOne(email: string): Promise<User> | null {
    return await this.userModel.findOne({ email }).exec();
  }

  async addUsersTransaction(payload, money: number, isPercents: boolean) {
    const transaction = await this.transactionService.createTransaction({
      sum: money,
      isPercentage: isPercents,
      user: payload,
    });
    await transaction.save();
    const user = await this.changeUserBalance(payload.email, money).then(
      async () => {
        return await this.changeUserRole(payload.email, Role.Investor);
      },
    );

    if (user) {
      user.transactions.push(transaction);
      user.save();
    } else {
      console.log('Session have not contained user in transaction');             //todo add logger
    }
  }

  async changeUserBalance(
    email: string,
    money: number,
    session = null,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ email }, { $inc: { balance: money } })
      .session(session);
  }

  /**
   *
   * @param email users email
   * @param role new role which need to set user
   */
  async changeUserRole(email: string, role: Role) {
    return this.userModel.findOneAndUpdate(
      { email },
      {
        roles: [role],
      },
    );
  }

  /**
   * Recursive function for adding percentage in all levels
   * @param sum profit sum
   * @param user selected investor
   * @returns {Promise<void>}
   */
  async addProfit(sum, user): Promise<void> {
    await this.addUsersTransaction(user, sum, true);
    const profit = sum / 10; // 10% for invited user

    if (user.InviterId != null && profit > 0.01) {
        console.log(user)
      const tempUser = await this.getUserById(user.InviterId);
      await this.addProfit(profit, tempUser);
    }
  }

  async getAllMoneyValue() {
    return this.userModel.aggregate([
      { $match: { roles: Role.Investor } },
      {
        $group: {
          _id: null,
          money: { $sum: '$balance' },
        },
      },
    ]);
  }

  /**
   * Function return data about startup(users quantity, all money in accounts)
   */
  async getStatistic(): Promise<Object> {
    return {
      users: await this.userModel.aggregate([
        { $group: { _id: '$roles', count: { $sum: 1 } } },
      ]),
      allMoney: await this.getAllMoneyValue(),
    };
  }

  async getMoney(money: number, adminEmail: string): Promise<number> {
    const users = await this.getUsersByRole([Role.Investor]);
    let profit = 0;
    let sum = 0;

    for (const user of users) {
      if (money <= 0) break;
      if (user.balance >= money) {
        sum = money;
        money = 0;
      } else {
        sum = user.balance;
        money = money - user.balance;
      }
      const sendMoney = await this.sendMoneyFromInvestorToAdmin(
        sum,
        user.email,
        adminEmail,
      );
      profit = profit + sendMoney;
    }
    return profit;
  }

  /**
   *
   * @param money
   * @param userEmail
   * @param adminEmail
   */
  async sendMoneyFromInvestorToAdmin(
    money: number,
    userEmail: string,
    adminEmail: string,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.changeUserBalance(userEmail, -money, session);
      await this.changeUserBalance(adminEmail, money, session);
      await session.commitTransaction();
    } catch (error) {
      money = 0;
      await session.abortTransaction(); //todo add logger
      throw error;
    } finally {
      await session.endSession();
    }
    return money;
  }
}
