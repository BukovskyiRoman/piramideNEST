//import { UserEntity } from '../../users/schemas/user.schema';
import { User } from "../../entity/user/user.entity";

export class CreateInviteDto {
  email: string;
  token: string;
  user: User;
}
