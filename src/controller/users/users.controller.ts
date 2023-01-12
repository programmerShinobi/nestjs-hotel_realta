import { Controller, Get} from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get()
    findAllUsers() {
        return this.usersService.findAllUsers();
    }
}
