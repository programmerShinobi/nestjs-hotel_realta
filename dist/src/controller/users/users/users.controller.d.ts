import { UsersService } from 'src/service/users/users/users.service';
import { bodyUsersDto } from './users.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAllUsers(): Promise<any>;
    findAllJoinUsers(): Promise<any>;
    findAllJoinUsersMaster(): Promise<any>;
    findOneUser(params: any): Promise<any>;
    createUsers(body: bodyUsersDto): Promise<any>;
    createUsersAndUserPassword(body1: any, body2: any): Promise<{
        message: string;
        allResults: {
            savedUser: any;
            savedUserPassword: any;
        };
    }>;
    updateUsers(params: any, body: bodyUsersDto): Promise<any>;
    deleteUsers(params: any): Promise<any>;
}
