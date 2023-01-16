import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBonusPoints } from 'entities/UserBonusPoints';
import { Repository } from 'typeorm';

@Injectable()
export class UserbonuspointsService {
    constructor(
        @InjectRepository(UserBonusPoints)
        private userBonusRepository: Repository<UserBonusPoints>
    ) { }
    
    async findAllUserBonusPoints(): Promise<any> {
        return await this.userBonusRepository.find({
            order: { ubpoId: -1 }
        }).then((result: any) => {
            if (!result) {
                throw new NotFoundException('Data not found');
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

    async findAllJoinUserBonusPoints(): Promise<any>{
        return await this.userBonusRepository.find({
            order: { ubpoId: -1 },
            relations: { ubpoUser: true }
        }).then((result: any) => {
            if (!result) {
                throw new NotFoundException('Data not found');
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

    async findOneUserBonusPoints(id: number): Promise<any> {
        return await this.userBonusRepository.findOne({
            where: { ubpoId: id }
        }).then((result: any) => {
            if (!result) {
                throw new NotFoundException('Data not found');
            }
            return {
                message: 'Data displayed successfully',
                resutls: result
            }
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            }
        });
    }
    
}
