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
    private userBonusPointsRepository;
    private userMembersRepository;
    private userProfilesRepository;
    private readonly connection;
    constructor(usersRepository: Repository<Users>, userRolesRepository: Repository<UserRoles>, userPasswordRepository: Repository<UserPassword>, userBonusPointsRepository: Repository<UserBonusPoints>, userMembersRepository: Repository<UserMembers>, userProfilesRepository: Repository<UserProfiles>, connection: Connection);
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
    updateUsers(id: any, data: Users): Promise<any>;
    updateUsersAndAllJoin(id: any, dataUsers: Users, dataUserRoles: UserRoles, dataUserPassword: UserPassword, dataUserBonusPoints: UserBonusPoints, dataUserMembers: UserMembers, dataUserProfiles: UserProfiles): Promise<{
        message: string;
        allResults: {
            updatedUser: any;
            updatedUserRoles: any;
            updatedUserPassword: any;
            updatedUserProfiles: any;
            updatedUserMembers: any;
            updatedUserBonusPoints: any;
        };
    }>;
    deleteUsers(id: number): Promise<any>;
    findEmail(email: any): Promise<any>;
}
