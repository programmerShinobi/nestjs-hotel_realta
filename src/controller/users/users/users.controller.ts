import { Body, Controller, Get, Param, Post, Put, Delete, UsePipes} from '@nestjs/common';
import { UsersService } from 'src/service/users/users/users.service'; 
import { ValidationPipe } from '@nestjs/common';
import { bodyUsersDto } from './users.dto'; // Data Transfer Object

@UsePipes(new ValidationPipe())
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get()
    findAllUsers() {
        return this.usersService.findAllUsers();
    }

    @Get('join-all-users')
    findAllJoinUsers() {
        return this.usersService.findAllJoinUsers();
    }

    @Get(':id')
    findOneUser(@Param() params) {
        return this.usersService.findOneUser(params.id)
    }

    @Post()
    // createUsers(@Body() body: bodyUsersDto) {
    createUsers(@Body() body) {
        return this.usersService.createUsers(body);
    }

    // @Post('createWithPassword')
    // createUsersAndUserPassword(@Body() body1, @Body() body2) {
    //     return this.usersService.createUsersAndUserPassword(body1, body2);
    // }

    @Post('createUsersAndAllJoin')
    createUsersAndAllJoin(
        @Body() body1,
        @Body() body2,
        @Body() body3,
        @Body() body4,
        @Body() body5,
        @Body() body6,
    ) {
        return this.usersService.createUsersAndAllJoin(
            body1,
            body2,
            body3,
            body4,
            body5,
            body6,
        );
    }

    @Put(':id')
    updateUsers(@Param() params, @Body() body: bodyUsersDto): Promise<any> {
        return this.usersService.updateUsers(params.id, body)
    }

    @Delete(':id')
    deleteUsers(@Param() params) {
        return this.usersService.deleteUsers(params.id);
    }

}
