import { UserpasswordService } from 'src/service/users/userpassword/userpassword.service';
import { bodyUserPasswordDto } from './userpassword.dto';
export declare class UserpasswordController {
    private userPasswordService;
    constructor(userPasswordService: UserpasswordService);
    findAllUserPassword(): Promise<any>;
    findAllJoinUserPassword(): Promise<any>;
    findOneUserPassword(params: any): Promise<any>;
    createUserPassword(body: bodyUserPasswordDto): Promise<any>;
    findPassword(params: any): Promise<any>;
}
