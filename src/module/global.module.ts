import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'entities/Department';
import { Roles } from 'entities/Roles';
import { UserRoles } from 'entities/UserRoles';
import { Users } from 'entities/Users';
import { DepartmentController } from 'src/controller/humanresource/department/department.controller';
import { RolesController } from 'src/controller/users/roles/roles.controller';
import { UserrolesController } from 'src/controller/users/userroles/userroles.controller';
import { UsersController } from 'src/controller/users/users/users.controller';
import { DepartmentService } from 'src/service/humanresource/department/department.service';
import { RolesService } from 'src/service/users/roles/roles.service';
import { UserrolesService } from 'src/service/users/userroles/userroles.service';
import { UsersService } from 'src/service/users/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Users, Roles, UserRoles])],
  controllers: [DepartmentController, UsersController, RolesController, UserrolesController],
  providers: [DepartmentService, UsersService, RolesService, UserrolesService],
})
export class GlobalModule {}