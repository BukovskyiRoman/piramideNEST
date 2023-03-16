import { User } from "../user/user.entity";
export declare class Invite {
    id: number;
    email: string;
    accepted: boolean;
    token: string;
    user: User;
}
