import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentQueryDto } from './dto/studetn.query.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }
  @Get('/:studentId/subject/:subjectId/attendance')
  StudentSubjectWiseAttencePercentage(
    @Param('studentId') studentId: number,
    @Param('subjectId') subjectId: number) {
    return this.studentService.StudentSubjectWiseAttencePercentage(studentId, subjectId);
  }

  @Get('/:studentId/attendance')
  studentOverAllAttendencePercentage(@Param('studentId') studentId: number) {
    return this.studentService.studentOverAllAttendencePercentage(studentId)
  }

  @Get(":studentId/classDetails")
  myClassInfomation(@Param('studentId')studentId:number) {
      return this.studentService.myClassInfomation(studentId);
  }

  @Get()
  allStudents(query:StudentQueryDto){
    return this.allStudents(query);
  }
}