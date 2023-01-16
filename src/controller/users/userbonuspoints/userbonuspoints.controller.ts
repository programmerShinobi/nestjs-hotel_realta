import { Controller, Get, Param } from '@nestjs/common';
import { UserbonuspointsService } from 'src/service/users/userbonuspoints/userbonuspoints.service';

@Controller('userbonuspoints')
export class UserbonuspointsController {
    constructor(
        private userBonusPointsService: UserbonuspointsService
    ) { }
    
    @Get()
    findAllUserBonusPoints() {
        return this.userBonusPointsService.findAllUserBonusPoints();
    }

    @Get('join-all-userbonuspoints')
    findAllJoinUserBonusPoints() {
        return this.userBonusPointsService.findAllJoinUserBonusPoints();
    }

    @Get(':id')
    findOneUserBonusPoints(@Param() params) {
        return this.userBonusPointsService.findOneUserBonusPoints(params.id);
    }
}
