import { HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';  
import { Users } from 'entities/Users';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) { }
    
    async findAllUsers(req:any, res:any): Promise<any>{
        return await this.userRepository.find({ order: { userId: -1 } })
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "Data displayed succussfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "Data not found"
                    })
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message,
                    error: err.error
                });
            });
    }

    async findOneUser(id: number, req: any, res: any): Promise<any>{
        return await this.userRepository.findOne({ where: { userId: id } })
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "Data displayed successfully",
                        result: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "Data not found"
                    });
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message,
                    error: err.error
                });
            });
    }
}
