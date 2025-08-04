import { IsNumber, IsString } from "class-validator";

export class CreateClassSubjectTeacherDto {
    @IsNumber()
    classId: number;

    @IsNumber()
    subjectId: number;

    @IsNumber()
    teacherId: number;
}
