import { Repository } from 'typeorm';
import { UserRoles } from 'entities/UserRoles';
export declare class UserrolesService {
    private userRolesRepository;
    constructor(userRolesRepository: Repository<UserRoles>);
    findAllUserRoles(): Promise<any>;
    findAllJoinUserRoles(): Promise<any>;
    findOneUserRoles(id: number): Promise<any>;
    createUserRoles(data: UserRoles): Promise<any>;
}
