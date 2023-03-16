import { Queue } from "bull";
import { User } from "../entity/user/user.entity";
import { Repository } from "typeorm";
import { Invite } from "../entity/invite/invite.entity";
export declare class InviteService {
    private invitesRepository;
    private mailQueue;
    constructor(invitesRepository: Repository<Invite>, mailQueue: Queue);
    createInvite(invite: {
        user: User;
        email: string;
        token: string;
    }, inviteAddress: string): Promise<Invite>;
    acceptInvite(token: string, email: string): Promise<Invite> | null;
}
