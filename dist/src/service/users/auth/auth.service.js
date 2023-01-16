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
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
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
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map