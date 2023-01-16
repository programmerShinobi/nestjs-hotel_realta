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
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map