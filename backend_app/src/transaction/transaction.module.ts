import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
//import { Transaction, TransactionSchema } from './transaction.schema';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invite } from "../entity/invite/invite.entity";
import { User } from "../entity/user/user.entity";
import { Transaction } from "../entity/transaction/transaction.entity";

@Module({
  providers: [TransactionService],
  exports: [TransactionService],
  imports: [
    // MongooseModule.forFeature([
    //   { name: Transaction.name, schema: TransactionSchema },
    // ]),
      TypeOrmModule.forFeature([Transaction, User]),
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
