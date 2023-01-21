import { AuthService } from 'src/service/users/auth/auth.service';
import { UserpasswordService } from 'src/service/users/userpassword/userpassword.service';
import { bodyLoginDto, bodyRegister1Dto, bodyRegister2Dto } from './auth.dto';
export declare class AuthController {
    private userpasswordService;
    private authService;
    constructor(userpasswordService: UserpasswordService, authService: AuthService);
    findPassword(params: any): Promise<any>;
    findEmail(params: any): Promise<any>;
    login(body: bodyLoginDto): Promise<any>;
    register(body1: bodyRegister1Dto, body2: bodyRegister2Dto): Promise<{
        result: {
            savedUser: any;
            savedUserPassword: any;
        };
        error?: undefined;
        message?: undefined;
        detailMessage?: undefined;
    } | {
        error: any;
        message: any;
        detailMessage: any;
        result?: undefined;
    }>;
}
