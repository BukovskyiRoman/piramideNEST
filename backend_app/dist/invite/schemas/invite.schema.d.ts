import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type InviteDocument = HydratedDocument<Invite>;
export declare class Invite {
    push(invite: mongoose.Document<unknown, any, Invite> & Invite & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>): void;
    email: string;
    accepted: boolean;
    token: string;
    user: User;
}
export declare const InviteSchema: mongoose.Schema<Invite, mongoose.Model<Invite, any, any, any, any>, {}, {}, {}, {}, "type", Invite>;
