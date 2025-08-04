import { IsOptional, IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    description:string

    @IsString()
    acadmicYear:string
}
