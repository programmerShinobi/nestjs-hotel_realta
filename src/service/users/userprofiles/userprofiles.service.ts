import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfiles } from 'entities/UserProfiles';
import { Repository } from 'typeorm';

@Injectable()
export class UserprofilesService {
    constructor(
        @InjectRepository(UserProfiles)
        private userProfilesRepository: Repository<UserProfiles>
    ) { }
    
    async findAllUserProfiles(): Promise<any>{
        return await this.userProfilesRepository.find({
            order: { usproId: -1 }
        }).then((result: any) => {
            if (!result) {
                return new NotFoundException('Data not found');
            }
            return {
                message: 'Data displayed successfully',
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
