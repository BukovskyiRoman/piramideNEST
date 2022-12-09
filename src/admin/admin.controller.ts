import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { adminMoneyBody } from '../validation/validation-classes/adminGetMoneyBody';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('admin')
export class AdminController {
  constructor(
    private userService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiBody({
    description: 'Sum of money which you wanna get',
    required: true,
    schema: {
      type: 'number',
      example: '99',
    },
  })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiForbiddenResponse({ description: 'Admin only' })
  @Roles(Role.Admin)
  @Patch('get')
  async getMoney(@Body() body: adminMoneyBody, @Req() req) {
    const profit = await this.userService.getMoney(body.money, req.user.email);
    return {
      message: `You get ${profit}$`,
    };
  }

  @Get('profile')
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiForbiddenResponse({ description: 'Admin only' })
  @Roles(Role.Admin)
  async getAdminProfile(@Req() req) {
    return {
      profile: await this.userService.findOne(req.user.email),
      statistic: await this.userService.getStatistic(),
    };
  }
}
