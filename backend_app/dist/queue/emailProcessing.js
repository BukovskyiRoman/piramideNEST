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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const invite_email_1 = require("../email/invite-email");
let MailConsumer = class MailConsumer {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async transcode(job) {
        const letter = await (0, invite_email_1.inviteEmail)(job.data.token, job.data.email, job.data.address);
        await this.mailerService
            .sendMail(letter)
            .then(() => {
        })
            .catch((e) => {
            console.error(e.stack);
        });
    }
};
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailConsumer.prototype, "transcode", null);
MailConsumer = __decorate([
    (0, bull_1.Processor)('mail'),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailConsumer);
exports.MailConsumer = MailConsumer;
//# sourceMappingURL=emailProcessing.js.map