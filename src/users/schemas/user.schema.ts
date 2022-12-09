import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Transaction } from '../../transaction/transaction.schema';
import * as mongoose from 'mongoose';
import { Invite } from '../../invite/schemas/invite.schema';
import * as bcrypt from 'bcrypt';
import * as mongooseHidden from 'mongoose-hidden';
import { Role } from '../../enum/role.enum';
import { Roles } from '../../decorator/roles.decorator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  push(inviter: any) {
    throw new Error('Method not implemented.');
  }

  save() {
    throw new Error('Method not implemented.');
  }

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop()
  balance: number;

  @Prop({
    type: Array,
    enum: Role,
    default: [Role.User],
  })
  roles: Role[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  })
  transactions: Transaction;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invite' }] })
  invites: Invite;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  inviter: User;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseHidden);

UserSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});
