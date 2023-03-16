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
exports.InviteController = void 0;
const common_1 = require("@nestjs/common");
const invite_service_1 = require("./invite.service");
const users_service_1 = require("../users/users.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const uuid_1 = require("uuid");
const roles_decorator_1 = require("../decorator/roles.decorator");
const role_enum_1 = require("../enum/role.enum");
const roles_guard_1 = require("../guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let InviteController = class InviteController {
    constructor(inviteService, userService) {
        this.inviteService = inviteService;
        this.userService = userService;
    }
    async addInvite(param, req) {
        const user = await this.userService.findOne(req.user.email);
        console.log(user);
        const address = `${req.protocol}://${req.get('Host')}/auth/register`;
        try {
            return await this.inviteService.createInvite({
                email: param.email,
                token: (0, uuid_1.v4)(),
                user: user,
            }, address);
        }
        catch (e) {
            console.error(e.error);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Investor),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'Invited user email',
        required: true,
        schema: {
            type: 'email',
            example: 'test@gmail.com',
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Invite was created' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized user' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Something wrong with validation' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "addInvite", null);
InviteController = __decorate([
    (0, common_1.Controller)('invite'),
    (0, swagger_1.ApiTags)('invite'),
    __metadata("design:paramtypes", [invite_service_1.InviteService,
        users_service_1.UsersService])
], InviteController);
exports.InviteController = InviteController;
//# sourceMappingURL=invite.controller.js.map