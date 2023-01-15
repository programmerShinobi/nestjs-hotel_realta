import { Body, Controller, Get, Param, Post, Put, Delete, UsePipes} from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
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

    @Get('join-all-users-master')
    findAllJoinUsersMaster() {
        return this.usersService.findAllJoinUsersMaster();
    }

    @Get(':id')
    findOneUser(@Param() params) {
        return this.usersService.findOneUser(params.id)
    }

    @Post()
    createUsers(@Body() body: bodyUsersDto) {
        return this.usersService.createUsers(body);
    }

    @Put(':id')
    updateUsers(@Param() params, @Body() body: bodyUsersDto) {
        return this.usersService.updateUsers(params.id, body)
    }

    @Delete(':id')
    deleteUsers(@Param() params) {
        return this.usersService.deleteUsers(params.id);
    }
}
