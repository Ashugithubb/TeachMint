import { IsString, IsStrongPassword } from "class-validator";

export class CreateTeacherDto {
    @IsString()
     name:string

     @IsString()
     email:string

     @IsStrongPassword()
     password:string
}
