import { IsInt, IsObject, isObject, IsOptional } from "class-validator";
import { Attendance } from "../enum/attendence.status";

export class CreateAttendenceDto {
    @IsInt()
    classId:number

    @IsInt()
    studentId: number;

    @IsInt()
    subjectId: number;
    
    @IsOptional()
    @IsObject()
    sessions:{ [key: string]: Attendance };
}
