import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invite } from "../entity/invite/invite.entity";
import { User } from "../entity/user/user.entity";
import { Transaction } from "../entity/transaction/transaction.entity";

@Module({
  providers: [TransactionService],
  exports: [TransactionService],
  imports: [
      TypeOrmModule.forFeature([Transaction, User]),
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
