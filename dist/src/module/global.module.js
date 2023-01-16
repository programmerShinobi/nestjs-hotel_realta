"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Department_1 = require("../../entities/Department");
const Roles_1 = require("../../entities/Roles");
const UserPassword_1 = require("../../entities/UserPassword");
const UserRoles_1 = require("../../entities/UserRoles");
const Users_1 = require("../../entities/Users");
const department_controller_1 = require("../controller/humanresource/department/department.controller");
const auth_controller_1 = require("../controller/users/auth/auth.controller");
const roles_controller_1 = require("../controller/users/roles/roles.controller");
const userpassword_controller_1 = require("../controller/users/userpassword/userpassword.controller");
const userroles_controller_1 = require("../controller/users/userroles/userroles.controller");
const users_controller_1 = require("../controller/users/users/users.controller");
const department_service_1 = require("../service/humanresource/department/department.service");
const auth_service_1 = require("../service/users/auth/auth.service");
const roles_service_1 = require("../service/users/roles/roles.service");
const userpassword_service_1 = require("../service/users/userpassword/userpassword.service");
const userroles_service_1 = require("../service/users/userroles/userroles.service");
const users_service_1 = require("../service/users/users/users.service");
let GlobalModule = class GlobalModule {
};
GlobalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Department_1.Department, Users_1.Users, Roles_1.Roles, UserRoles_1.UserRoles, UserPassword_1.UserPassword])],
        controllers: [department_controller_1.DepartmentController, users_controller_1.UsersController, roles_controller_1.RolesController, userroles_controller_1.UserrolesController, userpassword_controller_1.UserpasswordController, auth_controller_1.AuthController],
        providers: [department_service_1.DepartmentService, users_service_1.UsersService, roles_service_1.RolesService, userroles_service_1.UserrolesService, userpassword_service_1.UserpasswordService, auth_service_1.AuthService],
    })
], GlobalModule);
exports.GlobalModule = GlobalModule;
//# sourceMappingURL=global.module.js.map