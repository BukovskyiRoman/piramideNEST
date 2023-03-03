import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUserAlreadyExist } from '../../validation/rules/emailExist';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({
    description: 'First name',
    minimum: 2,
  })
  readonly first_name: string;
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({
    description: 'The last name of a person',
    minimum: 2,
  })
  readonly last_name: string;
  @IsEmail()
  @IsUserAlreadyExist({
    message: 'UserEntity $value already exists. Choose another name.',
  })
  @ApiProperty({
    description: 'Person email',
  })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Person password',
  })
  readonly password: string;
  //readonly balance: string
  //readonly roles: string
}
