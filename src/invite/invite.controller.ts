import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InviteService } from './invite.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('invite')
@ApiTags('invite')
export class InviteController {
  constructor(
    private inviteService: InviteService,
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Post()
  @Roles(Role.Admin, Role.Investor)
  @ApiBearerAuth()
  @ApiBody({
    description: 'Invited user email',
    required: true,
    schema: {
      type: 'email',
      example: 'test@gmail.com',
    },
  })
  @ApiOkResponse({ description: 'Invite was created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiForbiddenResponse({ description: 'Something wrong with validation' })
  async addInvite(@Body() param, @Request() req) {
    const user = await this.userService.findOne(req.user.email);
    const address = `${req.protocol}://${req.get('Host')}/auth/register`;                   //todo search better method
      try {
          const invite = await this.inviteService.createInvite(
              {
                  email: param.email,
                  token: uuidv4(),
                  user: user,
              },
              address,
          );
          user.invites.push(invite);
          user.save();
          return invite;
      } catch (e) {
        console.error(e.error())            //todo logger
      }
  }
}
