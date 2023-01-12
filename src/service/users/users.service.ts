import { HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';  
import { Users } from 'entities/Users';
import { timestamp } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
        ) { }
        
        async findAllUsers(req:any, res:any): Promise<any>{
            return await this.userRepository.find({ order: { userId: -1 } })
            .then((result:any) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "SUCCESS! Data displayed successfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "FAILED! Data not found"
                    })
                }
            }).catch((err:any) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message,
                    error: err.error
                });
            });
        }

    async findOneUser(id: number, req: any, res: any): Promise<any>{
        return await this.userRepository.findOne({ where: { userId: id } })
            .then((result:any) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "SUCCESS! Data displayed successfully",
                        result: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "FAILED! Data not found"
                    });
                }
            }).catch((err:any) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message,
                    error: err.error
                });
            });
    }

    async createUser(body, req:any, res:any): Promise<any> {
        let now = Date();
        return await this.userRepository.save({
            userFullName: body.user,
            userType: body.userType,
            userCompanyName: body.userCompanyName,
            userEmail: body.userEmail,
            userPhoneNumber: body.userPhoneNumber,
            userModifiedDate: now
        }).then((result: any) => {
            if (result) {
                res.status(HttpStatus.OK).send({
                    message: "SUCCESS! Data inserted successfully",
                    result: result
                });
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE).send({
                    message: "FAILED! Data insert invalid"
                });
            }
        }).catch((err: any) => {
            res.status(HttpStatus.NOT_ACCEPTABLE).send({
                message: err.message,
                error: err.error
            })
        })
    }
}
