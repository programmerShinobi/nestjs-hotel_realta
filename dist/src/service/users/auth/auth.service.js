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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Users_1 = require("../../../../entities/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserPassword_1 = require("../../../../entities/UserPassword");
let AuthService = class AuthService {
    constructor(userRepository, userPasswordRepository) {
        this.userRepository = userRepository;
        this.userPasswordRepository = userPasswordRepository;
    }
    async findEmail(email) {
        return await this.userRepository.findOneBy({
            userEmail: email
        }).then((result) => {
            return result;
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async login(data) {
        return await this.findEmail(data.userEmail).then(async (users) => {
            if (users.userEmail == data.userEmail) {
                const IdUser = await this.userRepository.findOneBy({
                    userEmail: users.userEmail
                }).then((result) => {
                    return result.userId;
                }).catch((err) => {
                    return err;
                });
                const passwordUser = await this.userRepository.findOne({
                    where: { userId: IdUser },
                    relations: { userPassword: true }
                }).then((result) => {
                    return result.userPassword.uspaPasswordhash;
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
                const payload = {
                    userEmail: users.userEmail,
                    userFullName: users.userFullName,
                    userPhoneNumber: users.userPhoneNumber
                };
                if (await bcrypt.compare(data.userPassword, passwordUser)) {
                    const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3m' });
                    return {
                        message: 'Login successfully',
                        userdata: payload,
                        _token: token
                    };
                }
                else {
                    throw new common_1.BadRequestException('Password Invalid');
                }
            }
            else {
                throw new common_1.BadRequestException('Email invalid');
            }
        }).catch((err) => {
            return {
                message: err.message,
                error: err.name
            };
        });
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            request.userData = decoded;
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async register(data1, data2) {
        const manager = this.userPasswordRepository.manager;
        try {
            let savedUser;
            let savedUserPassword;
            let IDuser;
            await manager.transaction(async (transactionalEntityManager) => {
                const user = new Users_1.Users();
                user.userFullName = data1.userFullName;
                user.userEmail = data1.userEmail;
                user.userModifiedDate = new Date();
                savedUser = await transactionalEntityManager.save(user)
                    .then((result) => {
                    if (!result) {
                        throw new Error();
                    }
                    IDuser = result.userId;
                    return {
                        message: 'Success',
                        results: result
                    };
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
                userPassword.uspaUserId = IDuser;
                savedUserPassword = await transactionalEntityManager.save(userPassword)
                    .then((result) => {
                    if (!result) {
                        throw new Error();
                    }
                    return {
                        message: 'Success',
                        results: result
                    };
                }).catch((err) => {
                    return {
                        message: err.message,
                        error: err.name
                    };
                });
            });
            if (!savedUser) {
                throw Error('Failed, email already exists');
            }
            else if (!savedUserPassword) {
                throw Error('Failed, password is not strong enough');
            }
            else if (!savedUser && !savedUserPassword) {
                throw Error('Failed, email already exists and password is not strong enough');
            }
            else {
                return {
                    savedUser, savedUserPassword
                };
            }
        }
        catch (err) {
            this.userRepository.query(`
                users.roles, users.users, users.user_members, users.user_profiles, users.user_roles, users.user_password, users.user_bonus_points restart identity cascade;
            `);
            return {
                error: err.name,
                message: err.message
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(UserPassword_1.UserPassword)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map