import { Injectable, BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserPassword } from 'entities/UserPassword';
import { throwError } from 'rxjs';
import { ValidationError } from 'class-validator';

@Injectable()
export class AuthService implements CanActivate{
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,

        @InjectRepository(UserPassword)
        private userPasswordRepository: Repository<UserPassword>

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

       async register (data1: Users, data2: UserPassword) {
        const manager = this.userPasswordRepository.manager;
        try {
            let savedUser;
            let savedUserPassword; 
            let IDuser;
            await manager.transaction(async (transactionalEntityManager) => {
                const user = new Users();
                user.userFullName = data1.userFullName;
                user.userEmail = data1.userEmail;
                user.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(user)
                .then((result: any) => {
                    if (!result) {
                        throw new Error();
                    }
                    IDuser = result.userId;
                    return {
                        message: 'Success',
                        results: result
                    }
                }).catch((err: any) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(data2.uspaPasswordhash,salt);
                const userPassword = new UserPassword();
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                userPassword.uspaUserId = IDuser;
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                .then((result: any) => {
                    if (!result) {
                        throw new Error();
                    }
                    return {
                        message: 'Success',
                        results: result
                    }
                }).catch((err: any) => {
                    return {
                        message: err.message,
                        error: err.name
                    }
                });

            });
            // if (!savedUser) {
            //     throw Error('Failed, email already exists')
            // } else if ( !savedUserPassword) {
            //     throw Error('Failed, password is not strong enough')
            // } else {
            //     return {
            //         result: { savedUser, savedUserPassword },
            //     };
            // }
            
            if (!savedUser) {
                throw Error('Failed, email already exists')
            } else if ( !savedUserPassword) {
                throw Error('Failed, password is not strong enough')
            } else if(!savedUser && !savedUserPassword) {
                throw Error('Failed, email already exists and password is not strong enough')
            } else {
                return {
                    savedUser, savedUserPassword
                }
            }
        } catch (err) {
            this.userRepository.query(`
                users.roles, users.users, users.user_members, users.user_profiles, users.user_roles, users.user_password, users.user_bonus_points restart identity cascade;
            `);
            return {
            error: err.name,
            message: err.message
        };
        }
    }
    
}
