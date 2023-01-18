"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Users_1 = require("../../../../entities/Users");
const UserPassword_1 = require("../../../../entities/UserPassword");
const bcrypt = require("bcrypt");
const typeorm_3 = require("@nestjs/typeorm");
const typeorm_4 = require("typeorm");
const UserRoles_1 = require("../../../../entities/UserRoles");
const UserBonusPoints_1 = require("../../../../entities/UserBonusPoints");
const UserMembers_1 = require("../../../../entities/UserMembers");
const UserProfiles_1 = require("../../../../entities/UserProfiles");
let UsersService = class UsersService {
    constructor(usersRepository, userRolesRepository, userPasswordRepository, userBonusPoints, userMembers, userProfiles, connection) {
        this.usersRepository = usersRepository;
        this.userRolesRepository = userRolesRepository;
        this.userPasswordRepository = userPasswordRepository;
        this.userBonusPoints = userBonusPoints;
        this.userMembers = userMembers;
        this.userProfiles = userProfiles;
        this.connection = connection;
    }
    async findAllUsers() {
        return await this.usersRepository.find({
            order: { userId: -1 }
        }).then((result) => {
            if (!result) {
                throw new common_1.NotFoundException('Data not found');
            }
            return {
                message: 'Data displayed successfully',
                results: result
            };
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async findAllJoinUsers() {
        return await this.usersRepository.find({
            order: { userId: -1 },
            relations: ['userRoles', 'userPassword', 'userBonusPoints', 'userMembers', 'userProfiles']
        }).then((result) => {
            if (!result) {
                throw new common_1.NotFoundException('Data not found');
            }
            return {
                message: 'Data displayed successfully',
                results: result
            };
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async findAllJoinUsersMaster() {
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
        `).then((result) => {
            if (!result) {
                throw new common_1.NotFoundException('Data not found');
            }
            return {
                message: 'Data displayed successfully',
                results: result
            };
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async findOneUser(id) {
        return await this.usersRepository.findOne({
            where: { userId: id }
        }).then((result) => {
            if (!result) {
                throw new common_1.NotFoundException('Data not found');
            }
            return {
                message: 'Data displayed successfully',
                results: result
            };
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async createUsers(data) {
        let now = new Date();
        return await this.usersRepository.save({
            userFullName: data.userFullName,
            userType: data.userType,
            userCompanyName: data.userCompanyName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber,
            userModifiedDate: now
        }).then((result) => {
            if (!result) {
                throw new common_1.BadRequestException('Data insert failed');
            }
            return {
                message: 'Data inserted successfully',
                results: result
            };
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async createUsersAndUserPassword(data1, data2) {
        const manager = this.usersRepository.manager;
        try {
            let savedUser;
            let savedUserPassword;
            await manager.transaction(async (transactionalEntityManager) => {
                const user = new Users_1.Users();
                user.userFullName = data1.userFullName;
                user.userType = data1.userType;
                user.userCompanyName = data1.userCompanyName;
                user.userEmail = data1.userEmail;
                user.userPhoneNumber = data1.userPhoneNumber;
                user.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(user)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data users insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(data2.uspaPasswordhash, salt);
                const userPassword = new UserPassword_1.UserPassword();
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data insert failed');
                    }
                    return {
                        message: 'Data inserted successfully',
                        results: result
                    };
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
            });
            return {
                message: 'Data inserted successfully',
                allResults: { savedUser, savedUserPassword },
            };
        }
        catch (err) {
            throw err;
        }
    }
    async createUsersAndAllJoin(dataUsers, dataUserRoles, dataUserPassword, dataUserBonusPoints, dataUserMembers, dataUserProfiles) {
        const manager = this.usersRepository.manager;
        try {
            let savedUser;
            let savedUserRoles;
            let savedUserPassword;
            let savedUserBonusPoints;
            let savedUserMembers;
            let savedUserProfiles;
            await manager.transaction(async (transactionalEntityManager) => {
                const users = new Users_1.Users();
                users.userFullName = dataUsers.userFullName;
                users.userType = dataUsers.userType;
                users.userCompanyName = dataUsers.userCompanyName;
                users.userEmail = dataUsers.userEmail;
                users.userPhoneNumber = dataUsers.userPhoneNumber;
                users.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(users)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data users insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const userRoles = new UserRoles_1.UserRoles();
                userRoles.usroRole = dataUserRoles.usroRole;
                savedUserRoles = await transactionalEntityManager.save(userRoles)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data userRoles insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(dataUserPassword.uspaPasswordhash, salt);
                const userPassword = new UserPassword_1.UserPassword();
                userPassword.uspaPasswordhash = hashedPassword;
                userPassword.uspaPasswordsalt = 'bcrypt';
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data userPassword insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const userBonusPoints = new UserBonusPoints_1.UserBonusPoints();
                userBonusPoints.ubpoTotalPoints = dataUserBonusPoints.ubpoTotalPoints;
                userBonusPoints.ubpoBonusType = dataUserBonusPoints.ubpoBonusType;
                userBonusPoints.ubpoCreateOn = new Date();
                savedUserBonusPoints = await transactionalEntityManager.save(userBonusPoints)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data userBonusPoints insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const userMembers = new UserMembers_1.UserMembers();
                userMembers.usmeMembName = dataUserMembers.usmeMembName;
                userMembers.usmePromoteDate = new Date();
                userMembers.usmePoints = dataUserMembers.usmePoints;
                userMembers.usmeType = dataUserMembers.usmeType;
                savedUserMembers = await transactionalEntityManager.save(userMembers)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data userMembers insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const userProfiles = new UserProfiles_1.UserProfiles();
                userProfiles.usproNationalId = dataUserProfiles.usproNationalId;
                userProfiles.usproBirth = dataUserProfiles.usproBirth;
                userProfiles.usproJobTitle = dataUserProfiles.usproJobTitle;
                userProfiles.usproMaritalStatus = dataUserProfiles.usproMaritalStatus;
                userProfiles.usproGender = dataUserProfiles.usproGender;
                userProfiles.usproAddr = dataUserProfiles.usproAddr;
                savedUserProfiles = await transactionalEntityManager.save(userProfiles)
                    .then((result) => {
                    if (!result) {
                        throw new common_1.BadRequestException('Data userProfiles insert failed');
                    }
                    return result;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
            });
            return {
                message: 'Data inserted successfully',
                allResults: { savedUser, savedUserPassword },
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateUsers(id, data) {
        let now = new Date();
        return await this.usersRepository.update(id, {
            userFullName: data.userFullName,
            userType: data.userType,
            userCompanyName: data.userCompanyName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber,
            userModifiedDate: now
        }).then(async (result) => {
            if (!result.affected) {
                throw new common_1.BadRequestException('Data update failed');
            }
            let dataUpdated = await this.usersRepository.findOneBy({ userId: id });
            return {
                message: 'Data updated successfully',
                results: dataUpdated
            };
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async deleteUsers(id) {
        return await this.usersRepository.delete(id)
            .then((result) => {
            if (!result.affected) {
                throw new common_1.NotFoundException('Data not found');
            }
            else {
                return {
                    message: `Data deleted with ID : ${id} successfully`
                };
            }
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async findEmail(email) {
        return await this.usersRepository.findOneBy({ userEmail: email });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(UserRoles_1.UserRoles)),
    __param(2, (0, typeorm_1.InjectRepository)(UserPassword_1.UserPassword)),
    __param(3, (0, typeorm_1.InjectRepository)(UserBonusPoints_1.UserBonusPoints)),
    __param(4, (0, typeorm_1.InjectRepository)(UserMembers_1.UserMembers)),
    __param(5, (0, typeorm_1.InjectRepository)(UserProfiles_1.UserProfiles)),
    __param(6, (0, typeorm_3.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_4.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map