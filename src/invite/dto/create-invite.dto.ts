import { User } from '../../users/schemas/user.schema';

export class CreateInviteDto {
  email: string;
  token: string;
  user: User;
}
