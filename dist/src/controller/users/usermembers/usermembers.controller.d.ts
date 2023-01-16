import { UsermembersService } from 'src/service/users/usermembers/usermembers.service';
import { bodyUserMembersDto } from './usermembers.dto';
export declare class UsermembersController {
    private userMembersService;
    constructor(userMembersService: UsermembersService);
    findAllUserMembers(): Promise<any>;
    findAllJoinUserMembers(): Promise<any>;
    findOneUserMembers(params: any): Promise<any>;
    createUserMembers(body: bodyUserMembersDto): Promise<any>;
}
