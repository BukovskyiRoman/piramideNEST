import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  push(
    transaction: mongoose.Document<unknown, any, Transaction> &
      Transaction & { _id: mongoose.Types.ObjectId } & Required<{
        _id: mongoose.Types.ObjectId;
      }>,
  ) {
    throw new Error('Method not implemented.');
  }
  @Prop({type: String, required: true})
  sum: number;

  @Prop({type: String})
  user_id: string;

  @Prop({type: Boolean})
  isPercentage: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
