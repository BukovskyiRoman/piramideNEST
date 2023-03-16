import { UsersService } from "../users/users.service";
import { Logger } from "winston";
import { adminMoneyBody } from "../validation/validation-classes/adminGetMoneyBody";
export declare class AdminController {
    private userService;
    private readonly logger;
    constructor(userService: UsersService, logger: Logger);
    getMoney(body: adminMoneyBody, req: any): Promise<{
        message: string;
    }>;
    getAdminProfile(req: any): Promise<{
        profile: import("../entity/user/user.entity").User;
        statistic: Object;
    }>;
}
