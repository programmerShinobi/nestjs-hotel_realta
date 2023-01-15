import { IsEmpty, IsNotEmpty } from "class-validator";

export class bodyRolesDto {
    @IsNotEmpty()
    roleName: string;

    @IsEmpty()
    roleId: number;
    userRoles: any;
}