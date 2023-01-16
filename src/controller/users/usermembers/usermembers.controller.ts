import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Get, Param, Post, UsePipes } from '@nestjs/common/decorators';
import { UsermembersService } from 'src/service/users/usermembers/usermembers.service';
import { bodyUserMembersDto } from './usermembers.dto';

@UsePipes(new ValidationPipe())
@Controller('usermembers')
export class UsermembersController {
    constructor(
        private userMembersService: UsermembersService
    ) { }
    
    @Get()
    findAllUserMembers() {
        return this.userMembersService.findAllUserMembers();
    }

    @Get('join-all-usermembers')
    findAllJoinUserMembers() {
        return this.userMembersService.findAllJoinUserMembers();
    }

    @Get(':id')
    findOneUserMembers(@Param() params) {
        return this.userMembersService.findOneUserMembers(params.id);
    }

    @Post()
    createUserMembers(@Body() body: bodyUserMembersDto) {
        return this.userMembersService.createUserMembers(body);
    }
}
