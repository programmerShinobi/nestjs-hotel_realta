import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'entities/Department';
import { Users } from 'entities/Users';
import { DepartmentController } from 'src/controller/humanresource/department/department.controller';
import { UsersController } from 'src/controller/users/users.controller';
import { DepartmentService } from 'src/service/humanresource/department/department.service';
import { UsersService } from 'src/service/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Users])],
  controllers: [DepartmentController, UsersController],
  providers: [DepartmentService, UsersService],
})
export class GlobalModule {}