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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../service/users/users/users.service");
const common_2 = require("@nestjs/common");
const users_dto_1 = require("./users.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAllUsers() {
        return this.usersService.findAllUsers();
    }
    findAllJoinUsers() {
        return this.usersService.findAllJoinUsers();
    }
    findOneUser(params) {
        return this.usersService.findOneUser(params.id);
    }
    createUsers(body) {
        return this.usersService.createUsers(body);
    }
    createUsersAndAllJoin(body1, body2, body3, body4, body5, body6) {
        return this.usersService.createUsersAndAllJoin(body1, body2, body3, body4, body5, body6);
    }
    updateUsers(params, body) {
        return this.usersService.updateUsers(params.id, body);
    }
    updateUsersAndAllJoin(params, body1, body2, body3, body4, body5, body6) {
        return this.usersService.updateUsersAndAllJoin(params.id, body1, body2, body3, body4, body5, body6);
    }
    deleteUsers(params) {
        return this.usersService.deleteUsers(params.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('join-all-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllJoinUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOneUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Post)('createUsersAndAllJoin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Body)()),
    __param(5, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUsersAndAllJoin", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.bodyUpdateUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUsers", null);
__decorate([
    (0, common_1.Put)('updateUsersAndAllJoin/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Body)()),
    __param(5, (0, common_1.Body)()),
    __param(6, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUsersAndAllJoin", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUsers", null);
UsersController = __decorate([
    (0, common_1.UsePipes)(new common_2.ValidationPipe()),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map