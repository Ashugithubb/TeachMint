import { IsInt, IsObject, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Attendance } from '../enum/attendence.status';


export class StudentAttendanceDto {
    @IsInt()
    studentId: number;

    @IsObject()
    sessions: {
        [key: string]: Attendance;
    };
}

export class StudentAttendanceUpdateDto {
    @IsInt()
    classId: number;

    @IsInt()
    subjectId: number;

    @ValidateNested({ each: true })
    @Type(() => StudentAttendanceDto)
    students: StudentAttendanceDto[];
}
