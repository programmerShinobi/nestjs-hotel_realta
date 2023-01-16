import { IsEmpty, IsNotEmpty, IsStrongPassword } from "class-validator";

export class bodyUserPasswordDto{
    @IsNotEmpty()
    uspaUserId: number;
    uspaPasswordsalt: string

    @IsNotEmpty()
    @IsStrongPassword()
    uspaPasswordhash: string;

    @IsEmpty()
    uspaUser: any;

}