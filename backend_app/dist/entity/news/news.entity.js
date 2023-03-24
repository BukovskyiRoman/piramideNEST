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
exports.News = void 0;
const typeorm_1 = require("typeorm");
let News = class News {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        name: 'id'
    }),
    __metadata("design:type", Number)
], News.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'title',
        nullable: false
    }),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'body',
        nullable: false
    }),
    __metadata("design:type", String)
], News.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "href",
        nullable: false
    }),
    __metadata("design:type", String)
], News.prototype, "href", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "source",
        nullable: false
    }),
    __metadata("design:type", String)
], News.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        name: "date",
        nullable: false,
    }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], News.prototype, "date", void 0);
News = __decorate([
    (0, typeorm_1.Entity)('news')
], News);
exports.News = News;
//# sourceMappingURL=news.entity.js.map