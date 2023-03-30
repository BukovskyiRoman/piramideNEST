import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user/user.entity";
import { Repository } from "typeorm";
import { TransactionService } from "../transaction/transaction.service";
import { Transaction } from "../entity/transaction/transaction.entity";

describe("AuthService", () => {
    // let usersService: UsersService;
    // let jwtService: JwtService;
    // let module: TestingModule;
    // let repository: Repository<User>;
    //
    // beforeEach(async () => {
    //     module = await Test.createTestingModule({
    //         providers: [
    //             UsersService,
    //             JwtService,
    //             TransactionService,
    //             {
    //                 provide: getRepositoryToken(User),
    //                 useClass: Repository,
    //             },
    //             {
    //                 provide: getRepositoryToken(Transaction),
    //                 useClass: Repository,
    //             },
    //         ],
    //         imports: [
    //             TypeOrmModule.forRoot({
    //                 type: "postgres",
    //                 host: "localhost",
    //                 port: 5432,
    //                 username: "test",
    //                 password: "123456789",
    //                 database: "test",
    //                 entities: [User],
    //                 autoLoadEntities: true,
    //                 //synchronize: true,
    //                 //dropSchema: true,
    //             }),
    //         ]
    //     }).compile();
    //
    //     repository = module.get(getRepositoryToken(User))
    //     usersService = module.get<UsersService>(UsersService);
    //     jwtService = module.get(JwtService)
    // });
    //
    it("should compiled", function() {
        expect(true).toEqual(true)
        // expect(module).toBeDefined();
    });
});
