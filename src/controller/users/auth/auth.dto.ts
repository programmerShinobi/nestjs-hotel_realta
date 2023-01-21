import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class bodyLoginDto{
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    userPassword: string;
}

export class bodyRegisterDto{
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    @IsStrongPassword()
    uspaPasswordhash: string;

    @IsNotEmpty()
    userFullName: string;
}