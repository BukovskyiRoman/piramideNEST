import { HydratedDocument } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export type TransactionDocument = HydratedDocument<Transaction>;
export declare class Transaction {
    push(transaction: mongoose.Document<unknown, any, Transaction> & Transaction & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>): void;
    sum: number;
    user_id: string;
    isPercentage: boolean;
    user: User;
}
export declare const TransactionSchema: mongoose.Schema<Transaction, mongoose.Model<Transaction, any, any, any, any>, {}, {}, {}, {}, "type", Transaction>;
