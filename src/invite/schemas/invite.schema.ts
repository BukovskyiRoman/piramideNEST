import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { timestamp } from 'rxjs';

export type InviteDocument = HydratedDocument<Invite>;

@Schema({ timestamps: true })
export class Invite {
  push(
    invite: mongoose.Document<unknown, any, Invite> &
      Invite & { _id: mongoose.Types.ObjectId } & Required<{
        _id: mongoose.Types.ObjectId;
      }>,
  ) {
    throw new Error('Method not implemented.');
  }
  @Prop({type: 'string'})
  email: string;

  @Prop({ default: false, type: 'boolean' })
  accepted: boolean;

  @Prop({ type: 'string'})
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
