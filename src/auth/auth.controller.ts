import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Query,
  Inject,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { InviteService } from '../invite/invite.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private inviteService: InviteService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({
    type: [LoginUserDto],
    description: 'Data for login(email and password)',
  })
  @ApiResponse({ description: 'Return access token', status: 200 })
  @ApiResponse({ description: 'Unauthorized', status: 401 })
  async login(@Request() req) {
    const token = await this.authService.login(req.user._doc);
    return {
      access_token: token.access_token,
      //user: req.user
    };
  }

  @Post('register')
  @ApiBody({
    type: [CreateUserDto],
    description: 'Users data',
  })
  @ApiCreatedResponse({ description: 'Return created user' })
  @ApiResponse({ description: 'Bad request', status: 400 })
  @ApiQuery({
    name: 'token',
    description: 'Token from invite email',
    type: 'string',
    required: false,
    example: '0954b143-7cc9-499a-b086-b2bc3568ac20',
  })
  async register(@Body() user: CreateUserDto, @Query('token') token: string) {
    let inviter = null;
    const newUser = await this.userService.createUser(user);
    if (token) {
      const invite = await this.inviteService.acceptInvite(token, user.email);
      if (invite) {
        inviter = await this.userService.findOne(invite.user.email);
        newUser.inviter = inviter;
        await newUser.save();
      } else {
        this.logger.error({
            message: `Problem with invite(invite token=${token} and email from client ${user.email})`
        });
      }
    }
    return newUser;
  }
}
