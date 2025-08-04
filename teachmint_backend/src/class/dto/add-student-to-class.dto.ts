import { IsInt } from "class-validator"

export class AddStudentToClassDto{
    @IsInt()
    classId:number

    @IsInt()
    studentId:number
}