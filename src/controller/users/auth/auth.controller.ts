import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { UserPassword } from 'entities/UserPassword';
import { AuthService } from 'src/service/users/auth/auth.service';
import { UserpasswordService } from 'src/service/users/userpassword/userpassword.service';
import { bodyLoginDto } from './auth.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
    constructor(
        private userpasswordService: UserpasswordService,
        private authService: AuthService
    ) { }
    
    @Get('password/:id')
    findPassword(@Param() params) {
        return this.userpasswordService.findPassword(params.id);
    }

    @Get('email/:email')
    findEmail(@Param() params) {
        return this.authService.findEmail(params.email)
    }

    @Post('login')
    login(@Body() body: bodyLoginDto) {
        return  this.authService.login(body)
    }
    

}