import { User } from "../../entity/user/user.entity";
export declare class CreateInviteDto {
    email: string;
    token: string;
    user: User;
}
