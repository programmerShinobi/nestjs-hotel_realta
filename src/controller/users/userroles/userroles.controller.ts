import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Param, Post, Put } from '@nestjs/common/decorators';
import { UserrolesService } from 'src/service/users/userroles/userroles.service';
import { bodyUserRolesDto } from './userroles.dto';

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

    @Get('join-all-userroles')
    findAllJoinUserRoles() {
        return this.userRolesService.findAllJoinUserRoles();
    }

    @Get(':id')
    findOneUserRoles(@Param() params) {
        return this.userRolesService.findOneUserRoles(params.id);
    }

    @Post()
    createUserRoles(@Body() body: bodyUserRolesDto) {
        return this.userRolesService.createUserRoles(body);        
    }

}
