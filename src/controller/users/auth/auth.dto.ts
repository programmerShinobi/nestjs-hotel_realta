import { IsEmail, IsNotEmpty } from "class-validator";

export class bodyLoginDto{
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    userPassword: string;
}