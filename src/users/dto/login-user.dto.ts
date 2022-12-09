import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Users email',
  })
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Users password',
  })
  readonly password: string;
}
