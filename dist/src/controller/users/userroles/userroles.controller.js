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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserrolesController = void 0;
const common_1 = require("@nestjs/common");
const userroles_service_1 = require("../../../service/users/userroles/userroles.service");
let UserrolesController = class UserrolesController {
    constructor(userRolesService) {
        this.userRolesService = userRolesService;
    }
    findAllRuleRoles() {
        return this.userRolesService.findAllUserRoles();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserrolesController.prototype, "findAllRuleRoles", null);
UserrolesController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Controller)('userroles'),
    __metadata("design:paramtypes", [userroles_service_1.UserrolesService])
], UserrolesController);
exports.UserrolesController = UserrolesController;
//# sourceMappingURL=userroles.controller.js.map