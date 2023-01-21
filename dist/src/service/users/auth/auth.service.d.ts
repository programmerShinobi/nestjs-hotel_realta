import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import { UserPassword } from 'entities/UserPassword';
export declare class AuthService implements CanActivate {
    private userRepository;
    private userPasswordRepository;
    constructor(userRepository: Repository<Users>, userPasswordRepository: Repository<UserPassword>);
    findEmail(email: string): Promise<any>;
    login(data: any): Promise<any>;
    canActivate(context: ExecutionContext): Promise<boolean>;
    register(data1: Users, data2: UserPassword): Promise<{
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
