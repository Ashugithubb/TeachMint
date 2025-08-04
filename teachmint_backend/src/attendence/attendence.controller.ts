import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { StudentAttendanceUpdateDto } from './dto/teacher-update-attendance.dto';

@Controller('attendence')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) { }

  @Patch('teacher/students')
  async updateAttendance(@Body() dto: StudentAttendanceUpdateDto) {  //Put
    return this.attendenceService.MarkStudentsAttendeance(dto);
  }

}
