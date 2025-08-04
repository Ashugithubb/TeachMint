import { IsInt } from "class-validator"

export class TeacherAttendanceDto {
    @IsInt()
    classId: number
    @IsInt()
    subjectId: number
}