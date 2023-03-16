import { User } from "../user/user.entity";
export declare class Transaction {
    id: number;
    sum: number;
    isPercentage: boolean;
    user: User;
}
