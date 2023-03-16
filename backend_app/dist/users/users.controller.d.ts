import { UsersService } from "./users.service";
import { User } from "../entity/user/user.entity";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserById(id: string): Promise<User> | null;
    userList(request: any): Promise<User[]>;
    changeUserBalance(req: any, money: number): Promise<void>;
    getUserProfile(req: any): Promise<User>;
}
