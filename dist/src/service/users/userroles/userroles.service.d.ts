import { Repository } from 'typeorm';
import { UserRoles } from 'entities/UserRoles';
export declare class UserrolesService {
    private userRolesRepository;
    constructor(userRolesRepository: Repository<UserRoles>);
    findAllUserRoles(): Promise<{
        messsage: string;
        results: any;
    } | {
        message: any;
        error: any;
    }>;
}
