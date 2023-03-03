import { Body, Controller, Get, HttpCode, Param, Patch, Req, UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { Roles } from "../decorator/roles.decorator";
import { Role } from "../enum/role.enum";
import {
    ApiBearerAuth,
    ApiBody,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { User } from "../entity/user/user.entity";
import { RolesGuard } from "../guards/roles.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("id/:id")
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @ApiParam({
        name: "id",
        type: "string",
        description: "Users id from DB",
        example: "638894735427264151f888ee"
    })
    async getUserById(@Param("id") id: string): Promise<User>|null {
        return await this.userService.getUserById(parseInt(id));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: "Return list of users, which has investor status."
    })
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async userList(@Req() request): Promise<User[]> {
        return this.userService.getUsersByRole([Role.Investor, Role.User]);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    @Patch(["get", "invest"])
    @Roles(Role.Investor, Role.User)
    @ApiBody({
        schema: {
            description: "Invest sum",
            type: "number",
            example: 55
        }
    })
    @ApiBearerAuth()
    @HttpCode(204)
    @ApiUnauthorizedResponse({ description: "Unauthorized user" })
    @ApiForbiddenResponse({ description: "Something wrong with validation" })
    @ApiNoContentResponse({ description: "Success" })
    async changeUserBalance(@Req() req, @Body("money") money: number) {
        const user = await this.userService.findOne(req.user.email);

        if (req.path === '/users/get' && money > 0) {
           money = - money;
        } else if (req.path === '/users/invest' && money < 0) {
            money = Math.abs(money)
        }

        await this.userService.addUsersTransaction(user, money, false);
    }

    @Get("profile")
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Success" })
    @ApiUnauthorizedResponse({ description: "Unauthorized user" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Investor, Role.User)
    async getUserProfile(@Req() req) {
        console.log(req.session.visits)
        console.log(req.cookies);
        return await this.userService.findOne(req.user.email, true, true, true);
    }
}
