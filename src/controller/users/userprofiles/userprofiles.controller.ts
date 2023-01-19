import { Controller, Get } from '@nestjs/common';
import { UserprofilesService } from 'src/service/users/userprofiles/userprofiles.service';

@Controller('userprofiles')
export class UserprofilesController {
    constructor(
        private userProfilesService: UserprofilesService
    ) { }
    
    @Get()
    findAllUserProfiles() {
        return this.userProfilesService.findAllUserProfiles()
    }
}
