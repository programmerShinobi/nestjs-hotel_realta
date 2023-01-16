import { AuthService } from 'src/service/users/auth/auth.service';
import { UserpasswordService } from 'src/service/users/userpassword/userpassword.service';
import { bodyLoginDto } from './auth.dto';
export declare class AuthController {
    private userpasswordService;
    private authService;
    constructor(userpasswordService: UserpasswordService, authService: AuthService);
    findPassword(params: any): Promise<any>;
    findEmail(params: any): Promise<any>;
    login(body: bodyLoginDto): Promise<any>;
}
