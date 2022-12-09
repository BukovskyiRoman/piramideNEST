import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async createTransaction(transaction: CreateTransactionDto) {
    const newTransaction = await this.transactionModel.create(transaction);
    return newTransaction.save({
      timestamps: { createdAt: true, updatedAt: true },
    });
  }

  async getTransactions() {
    return this.transactionModel.find().populate('user');
  }
}
