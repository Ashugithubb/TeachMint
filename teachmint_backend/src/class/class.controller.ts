import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { AddStudentToClassDto } from './dto/add-student-to-class.dto';


@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClassDto: CreateClassDto,@Req() req) {
    const adminId = req.user.id;
    return this.classService.create(createClassDto,adminId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/student")
  AddStudentToClass(@Body()addStudentToClassDto:AddStudentToClassDto){
      return this.classService.addStudentToClass(addStudentToClassDto)
  }

  @Get()
  allClasses(){
    return this.classService.allClasses();
  }
}
