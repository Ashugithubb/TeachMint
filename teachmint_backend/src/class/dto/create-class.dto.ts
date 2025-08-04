import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    // @Transform(({ value}) => value?.trim().toUppercase())
    name:string

    @IsOptional()
    @IsString()
    description:string

    @IsString()
    acadmicYear:string
}
