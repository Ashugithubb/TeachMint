import { IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @IsString()
    name:string

    @IsString()
    email:string

    @IsStrongPassword()
    password:string
}
