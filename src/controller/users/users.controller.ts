import { Controller, Get, Param, Req, Res} from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get()
    findAllUsers(@Req() req, @Res() res) {
        return this.usersService.findAllUsers(req, res);
    }

    @Get('/:id')
    findOneUser(@Param() params, @Req() req, @Res() res) {
        return this.usersService.findOneUser(params.id, req, res)
    }
}
