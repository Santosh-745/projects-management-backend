import { IsEmail, IsString } from "class-validator";

export class LoginpDto {
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;
}