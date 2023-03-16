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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const transaction_schema_1 = require("../../transaction/transaction.schema");
const mongoose = require("mongoose");
const invite_schema_1 = require("../../invite/schemas/invite.schema");
const bcrypt = require("bcrypt");
const mongooseHidden = require("mongoose-hidden");
const role_enum_1 = require("../../enum/role.enum");
let User = class User {
    push(inviter) {
        throw new Error('Method not implemented.');
    }
    save() {
        throw new Error('Method not implemented.');
    }
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Array,
        enum: role_enum_1.Role,
        default: [role_enum_1.Role.User],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    }),
    __metadata("design:type", transaction_schema_1.Transaction)
], User.prototype, "transactions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invite' }] }),
    __metadata("design:type", invite_schema_1.Invite)
], User.prototype, "invites", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", User)
], User.prototype, "inviter", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.plugin(mongooseHidden);
exports.UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password'];
        return ret;
    },
});
exports.UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            }
            else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }
                    user.password = hash;
                    next();
                });
            }
        });
    }
    else {
        return next();
    }
});
//# sourceMappingURL=user.schema.js.map