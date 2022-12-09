import { Module } from '@nestjs/common';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteSchema, Invite } from './schemas/invite.schema';
import { UsersModule } from '../users/users.module';
import { BullModule } from '@nestjs/bull';
import { MailConsumer } from '../queue/emailProcessing';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    UsersModule,
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  controllers: [InviteController],
  providers: [InviteService, MailConsumer],
  exports: [InviteService],
})
export class InviteModule {}
