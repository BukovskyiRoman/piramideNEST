import { UsersService } from '../users/users.service';
export declare class TaskService {
    private userService;
    constructor(userService: UsersService);
    bonusesProcessor(): Promise<void>;
}
