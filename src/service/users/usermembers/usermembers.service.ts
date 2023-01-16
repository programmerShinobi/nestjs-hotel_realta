import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMembers } from 'entities/UserMembers';
import { Repository } from 'typeorm';

@Injectable()
export class UsermembersService {
    constructor(
        @InjectRepository(UserMembers)
        private userMembersRepository: Repository<UserMembers>
    ) { }
    
    async findAllUserMembers(): Promise<any>{
        return await this.userMembersRepository.find({
            order: { usmeUserId: -1 }
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
    
    async findAllJoinUserMembers(): Promise<any>{
        return await this.userMembersRepository.find({
            order: { usmeUserId: -1 },
            relations: ['usmeUser','usmeMembName']
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

    async findOneUserMembers(id:number): Promise<any>{
        return await this.userMembersRepository.findOne({
            where: { usmeUserId: id },
            relations: ['usmeUser','usmeMembName']
        }).then((result: any) => {
            if (!result) {
                throw new NotFoundException('Data not found');
            }
            return {
                message: 'Data displyed successfully',
                results: result
            }
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            }
        });
    }

    async createUserMembers(data: any): Promise<any>{
        const now = new Date();
        return await this.userMembersRepository.save({
            usmeUserId: data.usmeUserId,
            usmeMembName: data.usmeMembName,
            usmePromoteDate: now,
            usmePoints: data.usmePoints,
            usmeType: data.usmeType
        }).then((result: any) => {
            if (!result) {
                throw new NotFoundException('Data not found');
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
