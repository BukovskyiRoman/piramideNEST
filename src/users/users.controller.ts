import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param, Patch,
    Req,
    Request,
    UseGuards
} from "@nestjs/common";
import { Request as req } from 'express'
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
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
    async getUserById(@Param("id") id: string) {
        return await this.userService.getUserById(id);
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
    @Patch("invest|get")
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
    async changeUserBalance(@Request() req: req, @Body("money") money: number) {
        money = req.path === '/users/invest' ? money : (- money);
        await this.userService.addUsersTransaction(req.user, money, false);
    }

    @Get("profile")
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Success" })
    @ApiUnauthorizedResponse({ description: "Unauthorized user" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Investor)
    async getUserProfile(@Req() req) {
        return await this.userService.findOne(req.user.email);
    }
}
