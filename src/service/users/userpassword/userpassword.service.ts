import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword } from 'entities/UserPassword';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserpasswordService {
    constructor(
        @InjectRepository(UserPassword)
        private userPasswordRepository : Repository<UserPassword>
    ) { }
    
    async findAllUserPassword(): Promise<any>{
        return this.userPasswordRepository.find({
            order: { uspaUserId: -1 }
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

    async findAllJoinUserPassword(): Promise<any> {
        return await this.userPasswordRepository.find({
            order: { uspaUserId: -1 },
            relations: {uspaUser:true}
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
        })
    }

    async findOneUserPassword(id: number): Promise<any>{
        return await this.userPasswordRepository.findOne({
            where: { uspaUserId: id },
            relations: { uspaUser: true }
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

    async createUserPassword(data: UserPassword): Promise<any>{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.uspaPasswordhash, salt);
        return await this.userPasswordRepository.save({
            // uspaUserId: data.uspaUserId,
            uspaPasswordhash: hashedPassword,
            uspaPasswordsalt: 'bcrypt'
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
