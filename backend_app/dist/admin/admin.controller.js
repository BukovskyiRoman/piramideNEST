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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorator/roles.decorator");
const role_enum_1 = require("../enum/role.enum");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const adminGetMoneyBody_1 = require("../validation/validation-classes/adminGetMoneyBody");
let AdminController = class AdminController {
    constructor(userService, logger) {
        this.userService = userService;
        this.logger = logger;
    }
    async getMoney(body, req) {
        const profit = await this.userService.getMoney(body.money, req.user.email);
        return {
            message: `You get ${profit}$`
        };
    }
    async getAdminProfile(req) {
        return {
            profile: await this.userService.findOne(req.user.email),
            statistic: await this.userService.getStatistic()
        };
    }
};
__decorate([
    (0, common_1.Patch)("get"),
    (0, swagger_1.ApiBody)({
        description: "Sum of money which you wanna get",
        required: true,
        schema: {
            type: "number",
            example: "99"
        }
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Success" }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized user" }),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Admin only" }),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminGetMoneyBody_1.adminMoneyBody, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getMoney", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, swagger_1.ApiOkResponse)({ description: "Success" }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized user" }),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Admin only" }),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminProfile", null);
AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("admin"),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        winston_1.Logger])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map