import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    findAllUsers(): Promise<any>;
    findAllJoinUsers(): Promise<any>;
    findAllJoinUsersMaster(): Promise<any>;
    findOneUser(id: number): Promise<any>;
    createUsers(data: Users): Promise<any>;
    updateUsers(id: number, data: Users): Promise<any>;
    deleteUsers(id: number): Promise<any>;
}
