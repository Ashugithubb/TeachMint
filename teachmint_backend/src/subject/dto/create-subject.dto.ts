import { IsString } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    name:string

    @IsString()
    courseCode:string

    @IsString()
    description:string
}
