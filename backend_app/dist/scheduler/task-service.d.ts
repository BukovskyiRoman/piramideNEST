import { UsersService } from "../users/users.service";
import { NewsService } from "../news/news.service";
export declare class TaskService {
    private userService;
    private readonly newsService;
    constructor(userService: UsersService, newsService: NewsService);
    bonusesProcessor(): Promise<void>;
    parseNews(): Promise<void>;
}
