import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../users/schemas/user.schema";
import { timestamp } from "rxjs";

export type InviteDocument = HydratedDocument<Invite>;

@Schema({ timestamps: true })
export class Invite {
    @Prop()
    email: string;

    @Prop()
    accepted: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
