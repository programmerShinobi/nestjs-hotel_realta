import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'entities/Department';
import { Roles } from 'entities/Roles';
import { Users } from 'entities/Users';
import { DepartmentController } from 'src/controller/humanresource/department/department.controller';
import { RolesController } from 'src/controller/users/roles/roles.controller';
import { UsersController } from 'src/controller/users/users/users.controller';
import { DepartmentService } from 'src/service/humanresource/department/department.service';
import { RolesService } from 'src/service/users/roles/roles.service';
import { UsersService } from 'src/service/users/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Users, Roles])],
  controllers: [DepartmentController, UsersController, RolesController],
  providers: [DepartmentService, UsersService, RolesService],
})
export class GlobalModule {}