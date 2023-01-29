import { UsersService } from 'src/service/users/users/users.service';
import { bodyUpdateUsersDto } from './users.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAllUsers(): Promise<any>;
    findAllJoinUsers(): Promise<any>;
    findOneUser(params: any): Promise<any>;
    createUsers(body: any): Promise<any>;
    createUsersAndAllJoin(body1: any, body2: any, body3: any, body4: any, body5: any, body6: any): Promise<{
        message: string;
        allResults: {
            savedUser: any;
            savedUserRoles: any;
            savedUserPassword: any;
            savedUserProfiles: any;
            savedUserMembers: any;
            savedUserBonusPoints: any;
        };
    }>;
    updateUsers(params: any, body: bodyUpdateUsersDto): Promise<any>;
    deleteUsers(params: any): Promise<any>;
}
