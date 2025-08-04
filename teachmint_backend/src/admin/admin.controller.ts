import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

 @Delete('teacher/:teacherId')
  remove(@Param('teacherId')teacherId:number) {
    return this.adminService.blockUnblockTeachers(teacherId);
  } 

  @Delete('student/:studentId')
  removeStudent(@Param('studentId')studentId:number) {
    return this.adminService.blockUnblockStudents(studentId);
  } 
}
