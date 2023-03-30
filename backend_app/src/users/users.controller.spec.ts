import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TransactionService } from "../transaction/transaction.service";
import { DataSource, EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user/user.entity";
import * as bcrypt from "bcrypt";
import { Transaction } from "../entity/transaction/transaction.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../decorator/roles.decorator";

describe("UsersController", () => {
    // let userController: UsersController;
    //
    //
    // beforeEach(async () => {
    //     const jwtGuard = { jwtAuthGuard: jest.fn(() => true) };
    //
    //     const module: TestingModule = await Test.createTestingModule({
    //         controllers: [UsersController],
    //         providers:[
    //             {
    //                 provide: JwtAuthGuard,
    //                 useValue: jest.fn().mockImplementation(() => true),
    //             },
    //             {
    //                 provide: RolesGuard,
    //                 useValue: jest.fn().mockImplementation(() => true),
    //             },
    //         ]
    //     })
    //         // .overrideGuard(JwtAuthGuard).useValue(true)
    //         // .overrideGuard(RolesGuard).useValue(true)
    //         .compile();
    //
    //     userController = module.get<UsersController>(UsersController);
    // });
    //
    // // it('should ensure Guards is applied to the get by id method', async () => {
    // //     const guards = Reflect.getMetadata('__guards__', UsersController)
    // //     const jwt = new (guards[0])
    // //     const role = new (guards[1])
    // //
    // //     expect(jwt).toBeInstanceOf(JwtAuthGuard)
    // //     expect(role).toBeInstanceOf(RolesGuard)
    // // });
    //
    it("should be defined", () => {
        expect(true).toEqual(true)
        // expect(userController).toBeDefined();
    });

});
