import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsUserAlreadyExist } from "../../validation-rules/emailExist";


export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    readonly first_name: string;
    @IsNotEmpty()
    @MinLength(2)
    readonly last_name: string;
    @IsEmail()
    @IsUserAlreadyExist({
        message: 'User $value already exists. Choose another name.',
    })
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
    //readonly balance: string
    //readonly role: string
}
