import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoles } from 'entities/UserRoles';

@Injectable()
export class UserrolesService {
    constructor(
        @InjectRepository(UserRoles)
        private userRolesRepository: Repository<UserRoles>
    ) { }
    
    async findAllUserRoles() {
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

}
