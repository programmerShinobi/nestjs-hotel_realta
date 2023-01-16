import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
export declare class AuthService implements CanActivate {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    findEmail(email: string): Promise<any>;
    login(data: any): Promise<any>;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
