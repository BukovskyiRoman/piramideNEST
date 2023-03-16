import { User } from '../../users/schemas/user.schema';

export class CreateTransactionDto {
  sum: number;
  isPercentage: boolean;
  user: User;
}
