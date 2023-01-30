import { Injectable, BadRequestException, NotFoundException, NestMiddleware  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from 'entities/Users';
import { UserPassword } from 'entities/UserPassword';
import * as bcrypt from 'bcrypt';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserRoles } from 'entities/UserRoles';
import { UserBonusPoints } from 'entities/UserBonusPoints';
import { UserMembers } from 'entities/UserMembers';
import { UserProfiles } from 'entities/UserProfiles';
// import * as Transaction from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,

        @InjectRepository(UserRoles)
        private userRolesRepository: Repository<UserRoles>,

        @InjectRepository(UserPassword)
        private userPasswordRepository: Repository<UserPassword>,
        
        @InjectRepository(UserBonusPoints)
        private userBonusPointsRepository: Repository<UserBonusPoints>,

        @InjectRepository(UserMembers)
        private userMembersRepository: Repository<UserMembers>,
        
        @InjectRepository(UserProfiles)
        private userProfilesRepository: Repository<UserProfiles>,
        
        @InjectConnection()
        private readonly connection: Connection,

    ) { }
        
    async findAllUsers(): Promise<any>{
        return await this.usersRepository.find({
            order: { userId: -1 } // -1 => DESC || 1 => ASC
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
            };
        });
    }

    // async findAllJoinUsers(): Promise<any>{
    //     return await this.usersRepository.find({
    //         order: { userId: -1 },
    //         relations: [ 'userRoles', 'userPassword', 'userBonusPoints', 'userMembers', 'userProfiles']
    //     }).then((result: any) => {
    //         if (!result) {
    //             throw new NotFoundException('Data not found');
    //         }
    //         return {
    //             message: 'Data displayed successfully',
    //             results: result
    //         }
    //     }).catch((err: any) => {
    //         return {
    //             message: err.message,
    //             error: err.name
    //         };
    //     });
    // }

    async findAllJoinUsers(): Promise<any> {
        return await this.usersRepository.query(`
            SELECT * FROM users.users uuu
            LEFT JOIN users.user_roles uur ON uur.usro_user_id = uuu.user_id 
            LEFT JOIN users.roles ur ON ur.role_id = uur.usro_role_id
            LEFT JOIN users.user_bonus_points uubp ON uubp.ubpo_user_id = uuu.user_id
            LEFT JOIN users.user_password uup ON uup.uspa_user_id = uuu.user_id
            LEFT JOIN users.user_members uum ON uum.usme_user_id = uuu.user_id
            LEFT JOIN master.members mm ON mm.memb_name = uum.usme_memb_name
            LEFT JOIN users.user_profiles uups ON uups.uspro_user_id = uuu.user_id
            ORDER BY user_id DESC
        `).then((result: any) => {
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
            };
        });
    }

    async findOneUser(id: number): Promise<any>{
        return await this.usersRepository.findOne({
            where: { userId: id }
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

    async createUserWithPassword(data1: Users, data2: UserPassword) {
        const manager = this.usersRepository.manager;
        try {
            let savedUser;
            let savedUserPassword; 
            let IDuser;
            await manager.transaction(async (transactionalEntityManager) => {
                const user = new Users();
                user.userFullName = data1.userFullName;
                user.userType = data1.userType;
                user.userCompanyName = data1.userCompanyName;
                user.userEmail = data1.userEmail;
                user.userPhoneNumber = data1.userPhoneNumber;
                user.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(user)
                .then((result: any) => {
                    if (!result) {
                        throw new BadRequestException('Data users insert failed');
                    }
                    IDuser = result.userId;
                    return result;
                }).catch((err: any) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(data2.uspaPasswordhash,salt);
                const userPassword = new UserPassword();
                userPassword.uspaUserId = IDuser;
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                .then((result: any) => {
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

            });
        return {
            message: 'Data inserted successfully',
            allResults: { savedUser, savedUserPassword },
        };
        } catch (err) {
        throw err;
        }
    }

    async updateUserWithPassword(id:number, data1: Users, data2: UserPassword) {
        const manager = this.usersRepository.manager;
        try {
            let savedUser;
            let savedUserPassword; 
            await manager.transaction(async (transactionalEntityManager) => {
                const user = await this.usersRepository.findOneBy({userId:id})
                user.userFullName = data1.userFullName;
                user.userType = data1.userType;
                user.userCompanyName = data1.userCompanyName;
                user.userEmail = data1.userEmail;
                user.userPhoneNumber = data1.userPhoneNumber;
                user.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(user)
                .then((result: any) => {
                    if (!result) {
                        throw new BadRequestException('Data users update failed');
                    }
                    return result;
                }).catch((err: any) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });

                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(data2.uspaPasswordhash, salt);
                const userPassword = await this.userPasswordRepository.findOneBy({ uspaUserId: id });
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                .then((result: any) => {
                    if (!result) {
                        throw new BadRequestException('Data update failed');
                    }
                    return {
                        message: 'Data updated successfully',
                        results: result
                    }
                }).catch((err: any) => {
                    return {
                        message: err.message,
                        error: err.name
                    }
                });

            });
        return {
            message: 'Data inserted successfully',
            allResults: { savedUser, savedUserPassword },
        };
        } catch (err) {
        throw err;
        }
    }

    async createAllJoinToUsers(
        dataUsers: Users,
        dataUserRoles: UserRoles,
        dataUserPassword: UserPassword,
        dataUserBonusPoints: UserBonusPoints,
        dataUserMembers: UserMembers,
        dataUserProfiles: UserProfiles
    ) {
        const manager = this.usersRepository.manager;
        try {
            let savedUser;
            let savedUserRoles;
            let savedUserPassword;
            let savedUserBonusPoints;
            let savedUserMembers;
            let savedUserProfiles;

            let IDuser;
            await manager.transaction(async (transactionalEntityManager) => {
                const users = new Users();
                users.userFullName = dataUsers.userFullName;
                users.userType = dataUsers.userType;
                users.userCompanyName = dataUsers.userCompanyName;
                users.userEmail = dataUsers.userEmail;
                users.userPhoneNumber = dataUsers.userPhoneNumber;
                users.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(users)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data users insert failed');
                        }
                        IDuser = result.userId;
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
                
                const userRoles = new UserRoles();
                userRoles.usroUserId = IDuser;
                userRoles.usroRole = dataUserRoles.usroRole;
                savedUserRoles = await transactionalEntityManager.save(userRoles)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userRoles insert failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
                
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(dataUserPassword.uspaPasswordhash, salt);
                const userPassword = new UserPassword();
                userPassword.uspaUserId = IDuser;
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userPassword insert failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
                
                const userBonusPoints = new UserBonusPoints();
                userBonusPoints.ubpoUser = IDuser;
                userBonusPoints.ubpoTotalPoints = dataUserBonusPoints.ubpoTotalPoints;
                userBonusPoints.ubpoBonusType = dataUserBonusPoints.ubpoBonusType;
                userBonusPoints.ubpoCreateOn = new Date();
                savedUserBonusPoints = await transactionalEntityManager.save(userBonusPoints)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userBonusPoints insert failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });

                const userMembers = new UserMembers();
                userMembers.usmeUserId = IDuser;
                userMembers.usmeMembName = dataUserMembers.usmeMembName;
                userMembers.usmePromoteDate = new Date();
                userMembers.usmePoints = dataUserMembers.usmePoints;
                userMembers.usmeType = dataUserMembers.usmeType
                savedUserMembers = await transactionalEntityManager.save(userMembers)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userMembers insert failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });

                const userProfiles = new UserProfiles();
                userProfiles.usproUser = IDuser;
                userProfiles.usproNationalId = dataUserProfiles.usproNationalId;
                userProfiles.usproBirth = dataUserProfiles.usproBirth;
                userProfiles.usproJobTitle = dataUserProfiles.usproJobTitle;
                userProfiles.usproMaritalStatus = dataUserProfiles.usproMaritalStatus;
                userProfiles.usproGender = dataUserProfiles.usproGender;
                userProfiles.usproAddr = dataUserProfiles.usproAddr;
                savedUserProfiles = await transactionalEntityManager.save(userProfiles)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userProfiles insert failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
            });
            return {
                message: 'Data inserted successfully',
                allResults: { savedUser, savedUserRoles, savedUserPassword, savedUserProfiles, savedUserMembers, savedUserBonusPoints },
            };

        } catch (error) {
            throw error;
        }
    }

    async updateUsers(id: any, data: Users): Promise<any>{        
        let now = new Date();
        return await this.usersRepository.update(id, {
            userFullName: data.userFullName,
            userType: data.userType,
            userCompanyName: data.userCompanyName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber,
            userModifiedDate: now // create date default : now
        }).then(async (result: any) => {
            if (!result.affected) {
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
    
    async updateAllJoinToUsers(
        id: any,
        dataUsers: Users,
        dataUserRoles: UserRoles,
        dataUserPassword: UserPassword,
        dataUserBonusPoints: UserBonusPoints,
        dataUserMembers: UserMembers,
        dataUserProfiles: UserProfiles
    ) {
        const manager = this.usersRepository.manager;
        try {
            let updatedUser;
            let updatedUserRoles;
            let updatedUserPassword;
            let updatedUserBonusPoints;
            let updatedUserMembers;
            let updatedUserProfiles;

            let IDuser = id;
            await manager.transaction(async (transactionalEntityManager) => {
                const users = await this.usersRepository.findOne({where: { userId: id }});
                users.userId = dataUsers.userId;
                users.userFullName = dataUsers.userFullName;
                users.userType = dataUsers.userType;
                users.userCompanyName = dataUsers.userCompanyName;
                users.userEmail = dataUsers.userEmail;
                users.userPhoneNumber = dataUsers.userPhoneNumber;
                users.userModifiedDate = new Date();
                updatedUser = await transactionalEntityManager.save(users)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data users update failed');
                        }
                        IDuser = result.userId;
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
                
                const userRoles = await this.userRolesRepository.findOne({ where: { usroUserId: id} });
                userRoles.usroRole = dataUserRoles.usroRole;
                updatedUserRoles = await transactionalEntityManager.save(userRoles)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userRoles update failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
                
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(dataUserPassword.uspaPasswordhash, salt);
                const userPassword = await this.userPasswordRepository.findOne({ where: { uspaUserId: id} });
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                updatedUserPassword = await transactionalEntityManager.save(userPassword)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userPassword update failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
                
                const userBonusPoints = await this.userBonusPointsRepository.findOne({ where: { ubpoUser: id} });
                userBonusPoints.ubpoTotalPoints = dataUserBonusPoints.ubpoTotalPoints;
                userBonusPoints.ubpoBonusType = dataUserBonusPoints.ubpoBonusType;
                userBonusPoints.ubpoCreateOn = new Date();
                updatedUserBonusPoints = await transactionalEntityManager.save(userBonusPoints)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userBonusPoints update failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });

                const userMembers = await this.userMembersRepository.findOne({ where: { usmeUserId: id} });
                userMembers.usmeMembName = dataUserMembers.usmeMembName;
                userMembers.usmePromoteDate = new Date();
                userMembers.usmePoints = dataUserMembers.usmePoints;
                userMembers.usmeType = dataUserMembers.usmeType
                updatedUserMembers = await transactionalEntityManager.save(userMembers)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userMembers update failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });

                const userProfiles = await this.userProfilesRepository.findOne({ where: { usproUser: id} });
                userProfiles.usproNationalId = dataUserProfiles.usproNationalId;
                userProfiles.usproBirth = dataUserProfiles.usproBirth;
                userProfiles.usproJobTitle = dataUserProfiles.usproJobTitle;
                userProfiles.usproMaritalStatus = dataUserProfiles.usproMaritalStatus;
                userProfiles.usproGender = dataUserProfiles.usproGender;
                userProfiles.usproAddr = dataUserProfiles.usproAddr;
                updatedUserProfiles = await transactionalEntityManager.save(userProfiles)
                    .then((result: any) => {
                        if (!result) {
                            throw new BadRequestException('Data userProfiles update failed');
                        }
                        return result;
                    }).catch((err: any) => {
                        return {
                            message: err.message,
                            error: err.name
                        }
                    });
            });
            return {
                message: 'Data inserted successfully',
                allResults: { updatedUser, updatedUserRoles, updatedUserPassword, updatedUserProfiles, updatedUserMembers, updatedUserBonusPoints },
            };

        } catch (error) {
            throw error;
        }
    }

    async deleteUsers(id: number): Promise<any>{
        return await this.usersRepository.delete(id)
        .then((result: any) => {
            if (!result.affected) {
                throw new NotFoundException('Data not found');
            } else {
                return {
                    message: `Data deleted with ID : ${id} successfully`
                }
            }
        }).catch((err: any) => {
            return {
                message: err.message,
                error: err.name
            };
        })
    }

    async findEmail(email: any): Promise<any>{
        return await this.usersRepository.findOneBy({ userEmail: email });
    }


}
