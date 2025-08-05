import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { StudentAttendanceUpdateDto } from './dto/teacher-update-attendance.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('attendance')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) { }

  @Put()
  async updateAttendance(@Body() dto: StudentAttendanceUpdateDto) {  //Put
    return this.attendenceService.MarkStudentsAttendeance(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAttendenceList(@Query('classId')classId:number,@Query("subjectId")subjectId:number, @Req() req) {
    // const teacherId = req.user.id;
    return this.attendenceService.findAttendenceList(classId,subjectId,1)
  }

}
