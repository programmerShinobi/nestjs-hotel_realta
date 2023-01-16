import { UserMembers } from 'entities/UserMembers';
import { Repository } from 'typeorm';
export declare class UsermembersService {
    private userMembersRepository;
    constructor(userMembersRepository: Repository<UserMembers>);
    findAllUserMembers(): Promise<any>;
    findAllJoinUserMembers(): Promise<any>;
    findOneUserMembers(id: number): Promise<any>;
    createUserMembers(data: any): Promise<any>;
}
