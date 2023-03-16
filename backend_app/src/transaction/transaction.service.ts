import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Invite } from "../entity/invite/invite.entity";
import { Repository } from "typeorm";
import { Transaction } from "../entity/transaction/transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
    // @InjectModel(Transaction.name)
    // private transactionModel: Model<TransactionDocument>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {}

  async createTransaction(transaction) {
    // const newTransaction = await this.transactionModel.create(transaction);
    // return newTransaction.save({
    //   timestamps: { createdAt: true, updatedAt: true },
    // });
      return this.transactionRepository.save(transaction);
  }

  async getTransactions() {
    //return this.transactionModel.find().populate('user');
      return this.transactionRepository.find()
  }
}
