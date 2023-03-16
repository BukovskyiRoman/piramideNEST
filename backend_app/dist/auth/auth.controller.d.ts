import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { InviteService } from "../invite/invite.service";
import { Logger } from "winston";
export declare class AuthController {
    private userService;
    private authService;
    private inviteService;
    private readonly logger;
    constructor(userService: UsersService, authService: AuthService, inviteService: InviteService, logger: Logger);
    login(req: any, response: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(user: CreateUserDto, token: string): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        balance: number;
        roles: import("../enum/role.enum").Role;
        inviter: import("../entity/user/user.entity").User;
        invites: import("../entity/invite/invite.entity").Invite[];
        transactions: import("../entity/transaction/transaction.entity").Transaction[];
    }>;
    getDashboard(): Promise<{
        users: number;
        greeting: string;
        deploy: number;
        success: boolean;
    }>;
}
