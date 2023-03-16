import { User } from '../../users/schemas/user.schema';
export declare class CreateTransactionDto {
    sum: number;
    isPercentage: boolean;
    user: User;
}
