import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(): Promise<import("../entity/transaction/transaction.entity").Transaction[]>;
}
