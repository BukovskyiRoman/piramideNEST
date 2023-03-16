import { UsersService } from "../users/users.service";
export declare class UploadService {
    private usersService;
    constructor(usersService: UsersService);
    createNewWorkSheet(): Promise<void>;
    syncUsers(filename: any): Promise<boolean>;
    checkExcelFields(row: any): Promise<boolean>;
}
