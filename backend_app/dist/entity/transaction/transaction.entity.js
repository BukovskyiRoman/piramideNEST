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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        name: 'id'
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'numeric',
        name: 'sum',
        nullable: false
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "sum", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "isPercentage",
        type: "boolean",
        default: false
    }),
    __metadata("design:type", Boolean)
], Transaction.prototype, "isPercentage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.transactions, {
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Transaction_User' }),
    __metadata("design:type", user_entity_1.User)
], Transaction.prototype, "user", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)('transaction')
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map