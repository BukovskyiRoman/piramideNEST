import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";

@Controller('user')
export class UsersController {

    constructor(private userService: UserService) {
    }

    @Post()
    async addUser(@Body() user: CreateUserDto) {
        return await this.userService.createUser(user);
    }

    @Get()
    async userList():Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id);
    }
}
