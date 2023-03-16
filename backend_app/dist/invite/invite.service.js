"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invite_entity_1 = require("../entity/invite/invite.entity");
let InviteService = class InviteService {
    constructor(invitesRepository, mailQueue) {
        this.invitesRepository = invitesRepository;
        this.mailQueue = mailQueue;
    }
    async createInvite(invite, inviteAddress) {
        await this.mailQueue.add({
            email: invite.email,
            token: invite.token,
            address: inviteAddress
        });
        const createdInvite = this.invitesRepository.create(invite);
        await this.invitesRepository.save(createdInvite);
        return createdInvite;
    }
    async acceptInvite(token, email) {
        const invite = await this.invitesRepository.findOne({
            where: {
                token,
                email
            },
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                }
            },
            relations: {
                user: true
            }
        });
        if (invite) {
            invite.accepted = true;
            await this.invitesRepository.save(invite);
            return invite;
        }
        return null;
    }
};
InviteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invite_entity_1.Invite)),
    __param(1, (0, bull_1.InjectQueue)("mail")),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], InviteService);
exports.InviteService = InviteService;
//# sourceMappingURL=invite.service.js.map