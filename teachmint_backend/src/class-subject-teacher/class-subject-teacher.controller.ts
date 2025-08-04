import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassSubjectTeacherService } from './class-subject-teacher.service';
import { CreateClassSubjectTeacherDto } from './dto/create-class-subject-teacher.dto';
import { UpdateClassSubjectTeacherDto } from './dto/update-class-subject-teacher.dto';

@Controller('class-subject-teacher')
export class ClassSubjectTeacherController {
  constructor(private readonly classSubjectTeacherService: ClassSubjectTeacherService) {}
  
  @Post()
  assignTeacherToSubjectInClass(@Body() createClassSubjectTeacherDto: CreateClassSubjectTeacherDto) {
    return this.classSubjectTeacherService.assignTeacherToSubjectInClass(createClassSubjectTeacherDto);
  }

}
