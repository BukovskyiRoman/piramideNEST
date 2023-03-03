import { Module } from "@nestjs/common";
import { InviteController } from "./invite.controller";
import { InviteService } from "./invite.service";
import { MongooseModule } from "@nestjs/mongoose";
//import { InviteSchema, Invite } from "./schemas/invite.schema";
import { UsersModule } from "../users/users.module";
import { BullModule } from "@nestjs/bull";
import { MailConsumer } from "../queue/emailProcessing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invite } from "../entity/invite/invite.entity";
import { User } from "../entity/user/user.entity";


@Module({
    imports: [
        //MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
        TypeOrmModule.forFeature([Invite, User]),
        UsersModule,
        BullModule.registerQueue({
            name: "mail"
        })
    ],
    controllers: [InviteController],
    providers: [InviteService, MailConsumer],
    exports: [InviteService]
})
export class InviteModule {
}
