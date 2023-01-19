import { UserprofilesService } from 'src/service/users/userprofiles/userprofiles.service';
export declare class UserprofilesController {
    private userProfilesService;
    constructor(userProfilesService: UserprofilesService);
    findAllUserProfiles(): Promise<any>;
}
