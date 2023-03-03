import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TransactionService } from "../transaction/transaction.service";
import { DataSource, EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user/user.entity";
import * as bcrypt from "bcrypt";

describe("UsersController", () => {
    let userController: UsersController;
    let userService: UsersService;
    let transactionService: TransactionService;
    let dataSource: DataSource;
    let usersRepository: Repository<User>;

    beforeEach(() => {
        userService = new UsersService(transactionService, dataSource, usersRepository);
        userController = new UsersController(userService);
    });

    // describe('getUserById', () => {
    //     it("should return user with needed id", async () => {
    //         const user: User = await userService.createUser({
    //             first_name: "Test",
    //             last_name: "Testovich",
    //             email: "test@nest.com",
    //             password: await bcrypt.hash('123456789', 10)
    //         });
    //
    //         jest.spyOn(userService, 'getUserById' ).mockImplementation( async () => {
    //             return await userService.getUserById(user.id);
    //         })
    //
    //         expect(await userController.getUserById(String(user.id))).toEqual(user.id)
    //     });
    // });

    describe('test', () => {

    })
});
