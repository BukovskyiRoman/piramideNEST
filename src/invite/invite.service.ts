import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviteDocument, Invite } from './schemas/invite.schema';
import { CreateInviteDto } from './dto/create-invite.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
    @InjectQueue('mail') private mailQueue: Queue,
  ) {}

  async createInvite(invite: CreateInviteDto, inviteAddress: string) {
    await this.mailQueue.add({
      email: invite.email,
      token: invite.token,
      address: inviteAddress,
    });

    return await this.inviteModel.create(invite);
  }

  async acceptInvite(token: string, email: string) {
    return this.inviteModel
      .findOneAndUpdate(
        { token, email, accepted: false },
        {
          accepted: true,
        },
      )
      .populate({ path: 'user', select: 'email' });
  }
}
