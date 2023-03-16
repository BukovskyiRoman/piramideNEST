import { Repository } from "typeorm";
import { Transaction } from "../entity/transaction/transaction.entity";
export declare class TransactionService {
    private transactionRepository;
    constructor(transactionRepository: Repository<Transaction>);
    createTransaction(transaction: any): Promise<any>;
    getTransactions(): Promise<Transaction[]>;
}
