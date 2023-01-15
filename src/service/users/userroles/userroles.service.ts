import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoles } from 'entities/UserRoles';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class UserrolesService {
    constructor(
        @InjectRepository(UserRoles)
        private userRolesRepository: Repository<UserRoles>
    ) { }
    
    async findAllUserRoles(): Promise<any> {
        return await this.userRolesRepository.find({
            order: { usroUserId: -1 }
        }).then((result: any) => {
            if (!result) {
                throw new NotFoundException('Data not fuound')
            }
            return {
                messsage: 'Data displayed successfully',
                results: result
            }
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            }
        });
    }

    async findAllJoinUserRoles(): Promise<any> {
        return this.userRolesRepository.find({
            order: { usroUserId: -1 },
            relations: ['usroRole', 'usroUser']
        })
    }

    async findOneUserRoles(id: number): Promise<any>{
        return this.userRolesRepository.findOne({
            where: { usroUserId: id },
            relations: ['usroRole', 'usroUser']
        })
    }

    async createUserRoles(data: UserRoles): Promise<any> {
        return this.userRolesRepository.save({
            usroUserId: data.usroUserId,
            usroRole: data.usroRole,
        }).then((result: any) => {
            if (!result) {
                throw new BadRequestException('Data insert failed');
            }
            return {
                message: 'Data inserted successfully',
                results: result
            }
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            }
        });
    }

}
