import { UserbonuspointsService } from 'src/service/users/userbonuspoints/userbonuspoints.service';
export declare class UserbonuspointsController {
    private userBonusPointsService;
    constructor(userBonusPointsService: UserbonuspointsService);
    findAllUserBonusPoints(): Promise<any>;
    findAllJoinUserBonusPoints(): Promise<any>;
    findOneUserBonusPoints(params: any): Promise<any>;
}
