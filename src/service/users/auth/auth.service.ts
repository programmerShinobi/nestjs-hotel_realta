import { Injectable, BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements CanActivate{
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) { }

    async findEmail(email: string): Promise<any>{
        return await this.userRepository.findOneBy({
            userEmail: email
        }).then((result: any) => {
            return result
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            }
        });
    }

    async login(data: any): Promise<any> {
        return await this.findEmail(data.userEmail).then(async (users) => {
            if (users.userEmail == data.userEmail) {
                const IdUser = await this.userRepository.findOneBy({
                    userEmail: users.userEmail
                }).then((result: any) => {
                    return result.userId
                }).catch((err: any) => {
                    return err
                });
    
                const passwordUser = await this.userRepository.findOne({
                    where: { userId: IdUser },
                    relations: { userPassword: true }
                }).then((result: any) => {
                    return result.userPassword.uspaPasswordhash
                }).catch((err: any) => {
                    return {
                        message: err.message,
                        error: err.name
                    }
                });
    
                const payload = {
                    userEmail: users.userEmail,
                    userFullName: users.userFullName,
                    userPhoneNumber: users.userPhoneNumber
                }
    
                if (await bcrypt.compare(data.userPassword, passwordUser)) {
                    const token = await jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        { expiresIn: '3m' }
                    );           
                    
                    return {
                        message: 'Login successfully',
                        userdata: payload,
                        _token: token
                    }
                } else {
                    throw new BadRequestException('Password Invalid');
                }
            } else {
                throw new BadRequestException('Email invalid');
            }   
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            }
        })       
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            request.userData = decoded;
            return true;
        } catch (error) {
            return false;
        }
    }
    
}
