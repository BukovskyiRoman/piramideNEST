import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    balance: number;

    @Prop()
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
