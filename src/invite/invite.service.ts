import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user/user.entity";
import { Repository } from "typeorm";
import { Invite } from "../entity/invite/invite.entity";

@Injectable()
export class InviteService {
    constructor(
        @InjectRepository(Invite)
        private invitesRepository: Repository<Invite>,
        @InjectQueue("mail") private mailQueue: Queue
    ) {
    }

    async createInvite(invite: { user: User; email: string; token: string }, inviteAddress: string) {
        await this.mailQueue.add({
            email: invite.email,
            token: invite.token,
            address: inviteAddress
        });
        const createdInvite = this.invitesRepository.create(invite);
        // createdInvite.user = invite.user;
        await this.invitesRepository.save(createdInvite);
        return createdInvite;
    }

    async acceptInvite(token: string, email: string): Promise<Invite> | null {
        const invite = await this.invitesRepository.findOne({
            where: {
                token,
                email
            },
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                }
            },
            relations: {
                user: true
            }
        });
        if (invite) {
            invite.accepted = true;
            await this.invitesRepository.save(invite);
            return invite;
        }
        return null;
    }
}
