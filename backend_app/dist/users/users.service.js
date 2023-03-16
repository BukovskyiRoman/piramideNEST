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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../enum/role.enum");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const transaction_service_1 = require("../transaction/transaction.service");
let UsersService = class UsersService {
    constructor(transactionService, dataSource, usersRepository) {
        this.transactionService = transactionService;
        this.dataSource = dataSource;
        this.usersRepository = usersRepository;
    }
    async createUser(userData) {
        const { password } = userData, result = __rest(userData, ["password"]);
        const passwordHash = {
            password: await bcrypt.hash(password, 10)
        };
        const data = Object.assign(Object.assign({}, result), passwordHash);
        return await this.usersRepository.save(data);
    }
    async getUsersByRole(userRoles) {
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
                roles: (0, typeorm_2.In)(userRoles)
            }
        });
    }
    async getUserById(id) {
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
    async findOne(email, transactions = false, inviter = false, invites = false) {
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
    async addUsersTransaction(user, money, isPercents) {
        await this.dataSource.manager.transaction(async (entityManager) => {
            await this.transactionService.createTransaction({
                sum: money,
                isPercentage: isPercents,
                user
            });
            await this.changeUserBalance(user, money).then(async () => {
                return await this.changeUserRole(user, role_enum_1.Role.Investor);
            });
        });
    }
    async changeUserBalance(user, money) {
        const sum = (parseFloat(String(user.balance))) + money;
        await this.usersRepository.update({ email: user.email }, { balance: sum });
        return user;
    }
    async changeUserRole(user, role) {
        await this.usersRepository.update({ email: user.email }, { roles: role });
    }
    async addProfit(sum, user) {
        await this.addUsersTransaction(user, sum, true);
        const profit = sum * 0.1;
        if (user.inviter && profit > 0.01) {
            const tempUser = await this.getUserById(user.inviter.id);
            await this.addProfit(profit, tempUser);
        }
    }
    async getAllMoneyValue() {
        return await this.usersRepository.sum("balance", { roles: role_enum_1.Role.Investor });
    }
    async getStatistic() {
        return {
            users: await this.usersRepository.createQueryBuilder("user")
                .where({
                "roles": role_enum_1.Role.User
            })
                .getCount(),
            investors: await this.usersRepository.createQueryBuilder("user")
                .where({
                "roles": role_enum_1.Role.Investor
            })
                .getCount(),
            allMoney: await this.getAllMoneyValue()
        };
    }
    async getMoney(money, adminEmail) {
        const users = await this.getUsersByRole([role_enum_1.Role.Investor]);
        const admin = await this.findOne(adminEmail);
        let profit = 0;
        let sum = 0;
        for (const user of users) {
            if (money <= 0)
                break;
            if (user.balance >= money) {
                sum = money;
                money = 0;
            }
            else {
                sum = user.balance;
                money = money - user.balance;
            }
            const sendSum = await this.createTransaction(user, admin, sum);
            profit = profit + Number(sendSum);
        }
        return profit;
    }
    async saveInviter(userId, inviter) {
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
    async getUserWithPassword(email) {
        return await this.usersRepository.createQueryBuilder("user")
            .where({ email })
            .addSelect("user.password")
            .getOne();
    }
    async createTransaction(user, admin, money) {
        const queryRunner = this.dataSource.createQueryRunner();
        const getSum = Number(user.balance) - money;
        const addSum = Number(admin.balance) + money;
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(user_entity_1.User, { id: user.id }, { balance: getSum });
            await queryRunner.manager.update(user_entity_1.User, { id: admin.id }, { balance: addSum });
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            money = 0;
        }
        finally {
            await queryRunner.release();
        }
        return money;
    }
    async updateUserProp(id, data) {
        await this.usersRepository.update({
            id
        }, data);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        typeorm_2.DataSource,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map