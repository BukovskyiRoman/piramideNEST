import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
//import { UserEntity, UserSchema } from './schemas/user.schema';
import { UsersController } from "./users.controller";
import { TransactionModule } from "../transaction/transaction.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user/user.entity";
import { Invite } from "../entity/invite/invite.entity";
import { Transaction } from "../entity/transaction/transaction.entity";

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [
        //MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
        TransactionModule,
        TypeOrmModule.forFeature([User, Invite, Transaction])
    ],
    controllers: [UsersController]
})
export class UsersModule {
}
