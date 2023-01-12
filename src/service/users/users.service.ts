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

    async findAllJoinUsers(req: any, res: any): Promise<any>{
        return await this.userRepository.query(`
            SELECT * FROM users.users uuu
            LEFT JOIN users.user_roles uur ON uur.usro_user_id = uuu.user_id 
            LEFT JOIN users.roles ur ON ur.role_id = uur.usro_role_id
            LEFT JOIN users.user_bonus_points uubp ON uubp.ubpo_user_id = uuu.user_id
            LEFT JOIN users.user_password uup ON uup.uspa_user_id = uuu.user_id
            LEFT JOIN users.user_members uum ON uum.usme_user_id = uuu.user_id
            LEFT JOIN users.user_profiles uups ON uups.uspro_user_id = uuu.user_id
        `).then((result: any) => {
            if (result) {
                res.status(HttpStatus.OK).send({
                    message: "Data displayed successfully",
                    results: result
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).send({
                    message: "Data not found"
                });
            }
        }).catch((err: any) => {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: err.message,
                error: err.error
            })
        })
    }

    async findAllJoinUsersMaster(req: any, res: any): Promise<any> {
        return await this.userRepository.query(`
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
        `).then((result: any) => {
            if (result) {
                res.status(HttpStatus.OK).send({
                    message: "Data displayed successfully",
                    results: result
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

    async createUser(body:Users, req:any, res:any): Promise<any> {
        let now = Date();
        return await this.userRepository.save({
            userFullName: body.userFullName,
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
        });
    }
}
