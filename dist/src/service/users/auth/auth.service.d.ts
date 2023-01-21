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
        message: string;
        allResults: {
            savedUser: any;
            savedUserPassword: any;
        };
    }>;
}
