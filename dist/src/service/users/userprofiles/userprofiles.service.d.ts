import { UserProfiles } from 'entities/UserProfiles';
import { Repository } from 'typeorm';
export declare class UserprofilesService {
    private userProfilesRepository;
    constructor(userProfilesRepository: Repository<UserProfiles>);
    findAllUserProfiles(): Promise<any>;
}
