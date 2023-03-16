import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "../enum/role.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user/user.entity";
import { DataSource, In, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { TransactionService } from "../transaction/transaction.service";

@Injectable()
export class UsersService {
    constructor(
        private transactionService: TransactionService,
        private dataSource: DataSource,
        //@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    // async onModuleInit() {
    //   try {
    //     const res = await this.userModel.find(); // this method returns user data exist in database (if any)
    //     if (res.length === 0) {
    //       const newUser = {
    //         first_name: 'Admin',
    //         last_name: 'Adminovich',
    //         password: '12345678',
    //         email: 'adminmail@gmail.com',
    //         roles: [Role.Admin],
    //         balance: 0,
    //       };
    //       const user = await this.userModel.create(newUser); // this method creates admin user in database
    //     }
    //   } catch (error) {
    //     //this.logger.error(error.message());
    //     throw error;
    //   }
    // }

    async createUser(userData: CreateUserDto): Promise<User> {
        const { password, ...result } = userData;
        const passwordHash = {
            password: await bcrypt.hash(password, 10)
        };
        const data = {
            ...result,
            ...passwordHash
        };
        return await this.usersRepository.save(data);
    }

    async getUsersByRole(userRoles: Role[]): Promise<User[]> {
        return this.usersRepository.find({
            select: {
                inviter: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                },
                invites: {
                    id: true,
                    accepted: true,
                    email: true
                },
                transactions: {
                    id: true,
                    sum: true,
                    isPercentage: true
                }
            },
            relations: {
                inviter: true,
                invites: true,
                transactions: true
            },
            where: {
                roles: In(userRoles)
            }

        });
    }

    async getUserById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({
            select: {
                inviter: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                },
                invites: {
                    id: true,
                    accepted: true,
                    email: true
                },
                transactions: {
                    id: true,
                    sum: true,
                    isPercentage: true
                }
            },
            where: {
                id: id
            },
            relations: {
                inviter: true
            }
        });
    }

    async findOne(
        email: string,
        transactions = false,
        inviter = false,
        invites = false
    ): Promise<User> | null {
        return await this.usersRepository.findOne({
            where: {
                email
            },
            relations: {
                inviter: inviter,
                transactions: transactions,
                invites: invites
            }
        });
    }

    async addUsersTransaction(user, money: number, isPercents: boolean) {

        await this.dataSource.manager.transaction(async (entityManager) => {
            await this.transactionService.createTransaction({
                sum: money,
                isPercentage: isPercents,
                user
            });
            await this.changeUserBalance(user, money).then(
                async () => {
                    return await this.changeUserRole(user, Role.Investor);
                }
            );
        });
    }

    async changeUserBalance(
        user: User,
        money: number
    ): Promise<User> {
        const sum = (parseFloat(String(user.balance))) + money;
        await this.usersRepository.update({ email: user.email }, { balance: sum });
        return user;
    }

    /**
     *
     * @param user
     * @param role new role which need to set user
     */
    async changeUserRole(user: User, role: Role) {
        await this.usersRepository.update({ email: user.email }, { roles: role });
    }

    /**
     * Recursive function for adding percentage in all levels
     * @param sum profit sum
     * @param user selected investor
     * @returns {Promise<void>}
     */
    async addProfit(sum, user): Promise<void> {
        await this.addUsersTransaction(user, sum, true);
        const profit = sum * 0.1; // 10% for invited user

        if (user.inviter && profit > 0.01) {
            const tempUser = await this.getUserById(user.inviter.id);
            await this.addProfit(profit, tempUser);
        }
    }

    async getAllMoneyValue() {
        return await this.usersRepository.sum("balance",
            { roles: Role.Investor }
        );
    }

    /**
     * Function return data about startup(users quantity, all money in accounts)
     */
    async getStatistic(): Promise<Object> {
        return {
            users: await this.usersRepository.createQueryBuilder("user")
                .where({
                    "roles": Role.User
                })
                .getCount()
            ,
            investors: await this.usersRepository.createQueryBuilder("user")
                .where({
                    "roles": Role.Investor
                })
                .getCount(),
            allMoney: await this.getAllMoneyValue()
        };
    }

    async getMoney(money: number, adminEmail: string): Promise<number> {
        const users = await this.getUsersByRole([Role.Investor]);
        const admin = await this.findOne(adminEmail);
        let profit: number = 0;
        let sum: number = 0;

        for (const user of users) {
            if (money <= 0) break;
            if (user.balance >= money) {
                sum = money;
                money = 0;
            } else {
                sum = user.balance;
                money = money - user.balance;
            }

            const sendSum = await this.createTransaction(user, admin, sum);
            profit = profit + Number(sendSum);
        }

        return profit;
    }

    async saveInviter(userId: number, inviter: User) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                inviter: true
            }
        });
        user.inviter = inviter;
        await this.usersRepository.save(user);
    }

    async getUserWithPassword(email: string) {
        return await this.usersRepository.createQueryBuilder("user")
            .where({ email })
            .addSelect("user.password")
            .getOne();
    }

    private async createTransaction(user: User, admin: User, money: number) {
        const queryRunner = this.dataSource.createQueryRunner();
        const getSum = Number(user.balance) - money;

        const addSum = Number(admin.balance) + money;

        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(User, { id: user.id }, { balance: getSum });
            await queryRunner.manager.update(User, { id: admin.id }, { balance: addSum });
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            money = 0;
        } finally {
            await queryRunner.release();
        }
        return money;
    }

    async updateUserProp(id: number, data: Object) {
        await this.usersRepository.update({
            id
        },
            data
        )
    }
}
