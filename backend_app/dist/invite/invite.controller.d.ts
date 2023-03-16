import { InviteService } from "./invite.service";
import { UsersService } from "../users/users.service";
export declare class InviteController {
    private inviteService;
    private userService;
    constructor(inviteService: InviteService, userService: UsersService);
    addInvite(param: any, req: any): Promise<import("../entity/invite/invite.entity").Invite>;
}
