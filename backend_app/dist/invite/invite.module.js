"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModule = void 0;
const common_1 = require("@nestjs/common");
const invite_controller_1 = require("./invite.controller");
const invite_service_1 = require("./invite.service");
const users_module_1 = require("../users/users.module");
const bull_1 = require("@nestjs/bull");
const emailProcessing_1 = require("../queue/emailProcessing");
const typeorm_1 = require("@nestjs/typeorm");
const invite_entity_1 = require("../entity/invite/invite.entity");
const user_entity_1 = require("../entity/user/user.entity");
let InviteModule = class InviteModule {
};
InviteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([invite_entity_1.Invite, user_entity_1.User]),
            users_module_1.UsersModule,
            bull_1.BullModule.registerQueue({
                name: "mail"
            })
        ],
        controllers: [invite_controller_1.InviteController],
        providers: [invite_service_1.InviteService, emailProcessing_1.MailConsumer],
        exports: [invite_service_1.InviteService]
    })
], InviteModule);
exports.InviteModule = InviteModule;
//# sourceMappingURL=invite.module.js.map