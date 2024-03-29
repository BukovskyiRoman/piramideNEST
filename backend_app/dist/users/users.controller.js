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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_decorator_1 = require("../decorator/roles.decorator");
const role_enum_1 = require("../enum/role.enum");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../guards/roles.guard");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserById(id) {
        return await this.userService.getUserById(parseInt(id));
    }
    async userList(request) {
        return this.userService.getUsersByRole([role_enum_1.Role.Investor, role_enum_1.Role.User]);
    }
    async changeUserBalance(req, money) {
        const user = await this.userService.findOne(req.user.email);
        if (req.path === '/users/get' && money > 0) {
            money = -money;
        }
        else if (req.path === '/users/invest' && money < 0) {
            money = Math.abs(money);
        }
        await this.userService.addUsersTransaction(user, money, false);
    }
    async getUserProfile(req) {
        console.log(req.session.visits);
        console.log(req.cookies);
        return await this.userService.findOne(req.user.email, true, true, true);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("id/:id"),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({
        name: "id",
        type: "string",
        description: "Users id from DB",
        example: "638894735427264151f888ee"
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiOkResponse)({
        description: "Return list of users, which has investor status."
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.HttpCode)(204),
    (0, common_1.Patch)(["get", "invest"]),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Investor, role_enum_1.Role.User),
    (0, swagger_1.ApiBody)({
        schema: {
            description: "Invest sum",
            type: "number",
            example: 55
        }
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized user" }),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Something wrong with validation" }),
    (0, swagger_1.ApiNoContentResponse)({ description: "Success" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("money")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeUserBalance", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ description: "Success" }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized user" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Investor, role_enum_1.Role.User),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserProfile", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map