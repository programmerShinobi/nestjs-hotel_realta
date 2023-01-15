import { UserrolesService } from 'src/service/users/userroles/userroles.service';
export declare class UserrolesController {
    private userRolesService;
    constructor(userRolesService: UserrolesService);
    findAllRuleRoles(): Promise<{
        messsage: string;
        results: any;
    } | {
        message: any;
        error: any;
    }>;
}
