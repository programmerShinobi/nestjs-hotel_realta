import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import { UserPassword } from 'entities/UserPassword';
import { Connection } from 'typeorm';
import { UserRoles } from 'entities/UserRoles';
import { UserBonusPoints } from 'entities/UserBonusPoints';
import { UserMembers } from 'entities/UserMembers';
import { UserProfiles } from 'entities/UserProfiles';
export declare class UsersService {
    private usersRepository;
    private userRolesRepository;
    private userPasswordRepository;
    private userBonusPoints;
    private userMembers;
    private userProfiles;
    private readonly connection;
    constructor(usersRepository: Repository<Users>, userRolesRepository: Repository<UserRoles>, userPasswordRepository: Repository<UserPassword>, userBonusPoints: Repository<UserBonusPoints>, userMembers: Repository<UserMembers>, userProfiles: Repository<UserProfiles>, connection: Connection);
    findAllUsers(): Promise<any>;
    findAllJoinUsers(): Promise<any>;
    findOneUser(id: number): Promise<any>;
    createUsers(data: Users): Promise<any>;
    createUsersAndUserPassword(data1: Users, data2: UserPassword): Promise<{
        message: string;
        allResults: {
            savedUser: any;
            savedUserPassword: any;
        };
    }>;
    createUsersAndAllJoin(dataUsers: Users, dataUserRoles: UserRoles, dataUserPassword: UserPassword, dataUserBonusPoints: UserBonusPoints, dataUserMembers: UserMembers, dataUserProfiles: UserProfiles): Promise<{
        message: string;
        allResults: {
            savedUser: any;
            savedUserRoles: any;
            savedUserPassword: any;
            savedUserProfiles: any;
            savedUserMembers: any;
            savedUserBonusPoints: any;
        };
    }>;
    updateUsers(id: number, data: Users): Promise<any>;
    deleteUsers(id: number): Promise<any>;
    findEmail(email: any): Promise<any>;
}
