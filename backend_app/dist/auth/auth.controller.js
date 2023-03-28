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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const invite_service_1 = require("../invite/invite.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const login_user_dto_1 = require("../users/dto/login-user.dto");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(userService, authService, inviteService, logger) {
        this.userService = userService;
        this.authService = authService;
        this.inviteService = inviteService;
        this.logger = logger;
    }
    async login(req, response) {
        var _a;
        let visits = 1;
        if (((_a = req.cookies.user_data) === null || _a === void 0 ? void 0 : _a.visits) && req.cookies.user_data.user_id === req.user.id) {
            visits = ++req.cookies.user_data.visits;
        }
        const { access_token } = await this.authService.login({ username: req.user.email, userId: req.user.id });
        response.cookie('user_data', {
            visits,
            user_id: req.user.id,
            date: Date.now()
        });
        return {
            access_token,
            user: req.user
        };
    }
    async register(user, token) {
        let inviter = null;
        const _a = await this.userService.createUser(user), { password } = _a, newUser = __rest(_a, ["password"]);
        if (token) {
            const invite = await this.inviteService.acceptInvite(token, newUser.email);
            if (invite) {
                inviter = await this.userService.findOne(invite.user.email);
                await this.userService.saveInviter(newUser.id, inviter);
            }
            else {
                this.logger.error({
                    message: `Problem with invite(invite token=${token} and email from client ${user.email})`
                });
            }
        }
        return newUser;
    }
    async getDashboard() {
        return {
            users: 999,
            greeting: "Hello dear friends",
            deploy: 16,
            success: true
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        type: [login_user_dto_1.LoginUserDto],
        description: "Data for login(email and password)"
    }),
    (0, swagger_1.ApiResponse)({ description: "Return access token", status: 200 }),
    (0, swagger_1.ApiResponse)({ description: "Unauthorized", status: 401 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiBody)({
        type: [create_user_dto_1.CreateUserDto],
        description: "Users data"
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Return created user" }),
    (0, swagger_1.ApiResponse)({ description: "Bad request", status: 400 }),
    (0, swagger_1.ApiQuery)({
        name: "token",
        description: "Token from invite email",
        type: "string",
        required: false,
        example: "0954b143-7cc9-499a-b086-b2bc3568ac20"
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getDashboard", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        invite_service_1.InviteService,
        winston_1.Logger])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map