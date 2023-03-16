import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "../enum/role.enum";
import { User } from "../entity/user/user.entity";
import { DataSource, Repository } from "typeorm";
import { TransactionService } from "../transaction/transaction.service";
export declare class UsersService {
    private transactionService;
    private dataSource;
    private usersRepository;
    constructor(transactionService: TransactionService, dataSource: DataSource, usersRepository: Repository<User>);
    createUser(userData: CreateUserDto): Promise<User>;
    getUsersByRole(userRoles: Role[]): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    findOne(email: string, transactions?: boolean, inviter?: boolean, invites?: boolean): Promise<User> | null;
    addUsersTransaction(user: any, money: number, isPercents: boolean): Promise<void>;
    changeUserBalance(user: User, money: number): Promise<User>;
    changeUserRole(user: User, role: Role): Promise<void>;
    addProfit(sum: any, user: any): Promise<void>;
    getAllMoneyValue(): Promise<number>;
    getStatistic(): Promise<Object>;
    getMoney(money: number, adminEmail: string): Promise<number>;
    saveInviter(userId: number, inviter: User): Promise<void>;
    getUserWithPassword(email: string): Promise<User>;
    private createTransaction;
    updateUserProp(id: number, data: Object): Promise<void>;
}
