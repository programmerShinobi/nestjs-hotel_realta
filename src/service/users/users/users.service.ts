import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from 'entities/Users';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) { }
        
    async findAllUsers(): Promise<any>{
        return await this.usersRepository.find({
            order: { userId: -1 } // -1 => DESC || 1 => ASC
        }).then((result: any) => {
            if (!result|| result == '') {
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
            };
        });
    }

    async findAllJoinUsers(): Promise<any>{
        return await this.usersRepository.find({
            order: { userId: -1 },
            relations: [ 'userRoles', 'userPassword', 'userBonusPoints', 'userMembers', 'userProfiles']
        }).then((result: any) => {
            if (!result|| result == '') {
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
            };
        });
    }

    async findAllJoinUsersMaster(): Promise<any> {
        return await this.usersRepository.query(`
            SELECT * FROM users.users uuu
            LEFT JOIN users.user_roles uur ON uur.usro_user_id = uuu.user_id 
            LEFT JOIN users.roles ur ON ur.role_id = uur.usro_role_id
            LEFT JOIN users.user_bonus_points uubp ON uubp.ubpo_user_id = uuu.user_id
            LEFT JOIN users.user_password uup ON uup.uspa_user_id = uuu.user_id
            LEFT JOIN users.user_members uum ON uum.usme_user_id = uuu.user_id
            LEFT JOIN master.members mm ON mm.memb_name = uum.usme_memb_name
            LEFT JOIN users.user_profiles uups ON uups.uspro_user_id = uuu.user_id
            LEFT JOIN master.address ma ON ma.addr_id = uups.uspro_addr_id
            LEFT JOIN master.provinces mp ON mp.prov_id = ma.addr_prov_id
            LEFT JOIN master.country mc ON mc.country_id = mp.prov_country_id
            LEFT JOIN master.regions mr ON mr.region_code = mc.country_region_id
            ORDER BY user_id DESC
        `).then((result: any) => {
            if (!result|| result == '') {
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
            };
        });
    }

    async findOneUser(id: number): Promise<any>{
        return await this.usersRepository.findOne({
            where: { userId: id }
        }).then((result: any) => {
            if (!result|| result == '') {
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
            };
        });
    }

    async createUsers(data: Users): Promise<any> {
        let now = new Date();
        return await this.usersRepository.save({
            userFullName: data.userFullName,
            userType: data.userType,
            userCompanyName: data.userCompanyName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber,
            userModifiedDate: now // create date default : now
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
            };
        });
    }

    async updateUsers(id: number, data: Users): Promise<any>{        
        let now = new Date();
        return await this.usersRepository.update(id, {
            userFullName: data.userFullName,
            userType: data.userType,
            userCompanyName: data.userCompanyName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber,
            userModifiedDate: now // create date default : now
        }).then(async (result: any) => {
            if (!result) {
                throw new BadRequestException('Data update failed');
            }

            let dataUpdated = await this.usersRepository.findOneBy({ userId: id });
            return {
                message: 'Data updated successfully',
                results: dataUpdated
            }
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }

    async deleteUsers(id: number): Promise<any>{
        return await this.usersRepository.delete(id)
            .then((result: any) => {
                if (!result.raws || result == '') {
                    throw new BadRequestException('Data not found')
                }
                return {
                    message: `Data deleted with ID : ${id} successfull`,
                    results: result
                }
            }).catch((err: any) => {
                return {
                    message: err.message,
                    error: err.name
                };
            });
    }
}
