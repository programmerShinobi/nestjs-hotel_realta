import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';  
import { Users } from 'entities/Users';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) { }
    
    async findAllUsers(): Promise<any>{
        return await this.userRepository.find({order:{userId:-1}});
    }
}
