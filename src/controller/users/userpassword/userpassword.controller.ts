import { Body, Controller, UsePipes, ValidationPipe, Get, Param, Post } from '@nestjs/common';
import { UserpasswordService } from 'src/service/users/userpassword/userpassword.service';
import { bodyUserPasswordDto } from './userpassword.dto';

@UsePipes(new ValidationPipe())
@Controller('userpassword')
export class UserpasswordController {
    constructor(
        private userPasswordService : UserpasswordService
    ) { }
    
    @Get()
    findAllUserPassword() {
        return this.userPasswordService.findAllUserPassword();
    }
    
    @Get('join-all-userpassword')
    findAllJoinUserPassword() {
        return this.userPasswordService.findAllJoinUserPassword();
    }

    @Get(':id')
    findOneUserPassword(@Param() params) {
        return this.userPasswordService.findOneUserPassword(params.id);
    }

    @Post()
    createUserPassword(@Body() body: bodyUserPasswordDto) {
        return this.userPasswordService.createUserPassword(body);
    }
}
