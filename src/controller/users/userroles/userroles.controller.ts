import { Controller, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { UserrolesService } from 'src/service/users/userroles/userroles.service';

@UsePipes(new ValidationPipe())
@Controller('userroles')
export class UserrolesController {
    constructor(
        private userRolesService : UserrolesService
    ) {}

    @Get()
    findAllRuleRoles() {
        return this.userRolesService.findAllUserRoles()
    }
}
