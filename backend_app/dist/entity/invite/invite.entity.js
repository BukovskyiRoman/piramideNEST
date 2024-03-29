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
exports.Invite = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let Invite = class Invite {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        name: 'id'
    }),
    __metadata("design:type", Number)
], Invite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'email',
        nullable: false
    }),
    __metadata("design:type", String)
], Invite.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        name: "accepted",
        default: false
    }),
    __metadata("design:type", Boolean)
], Invite.prototype, "accepted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "token"
    }),
    __metadata("design:type", String)
], Invite.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.invites),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Invite_User' }),
    __metadata("design:type", user_entity_1.User)
], Invite.prototype, "user", void 0);
Invite = __decorate([
    (0, typeorm_1.Entity)('invite')
], Invite);
exports.Invite = Invite;
//# sourceMappingURL=invite.entity.js.map