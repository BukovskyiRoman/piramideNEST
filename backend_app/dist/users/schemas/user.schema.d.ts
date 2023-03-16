import { HydratedDocument } from 'mongoose';
import { Transaction } from '../../transaction/transaction.schema';
import * as mongoose from 'mongoose';
import { Invite } from '../../invite/schemas/invite.schema';
import { Role } from '../../enum/role.enum';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    push(inviter: any): void;
    save(): void;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    balance: number;
    roles: Role[];
    transactions: Transaction;
    invites: Invite;
    inviter: User;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
