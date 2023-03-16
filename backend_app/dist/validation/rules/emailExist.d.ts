import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../../users/users.service';
export declare class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    private usersService;
    constructor(usersService: UsersService);
    validate(email: string | undefined): Promise<boolean>;
}
export declare function IsUserAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
