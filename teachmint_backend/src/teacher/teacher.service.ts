import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { ClassSubjectTeacherService } from 'src/class-subject-teacher/class-subject-teacher.service';
import { TeacherAttendanceDto } from './dto/teacher.attendance.dto';
import { AttendenceService } from 'src/attendence/attendence.service';

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    @Inject(forwardRef(() => ClassSubjectTeacherService))
    private readonly classSubjectTeacherService: ClassSubjectTeacherService,
    @Inject(forwardRef(() => AttendenceService))
    private readonly attendenceService:AttendenceService
  ) { }

  async getAttendenceList(dto:TeacherAttendanceDto,teacherId) {
    
  }


  async findOneByemail(email) {
    const teacher = await this.teacherRepo.findOne({
      where: { email }, withDeleted: false
    });
    return teacher;
  }

  async blockUnblockTeacher(teacherId: number) {
    const existing = await this.teacherRepo.findOneBy({ id: teacherId });
    if (existing) {
      return await this.teacherRepo.softDelete(teacherId);
    }
    return await this.teacherRepo.restore(teacherId);
  }

async findOne(id: number) {
    return await this.teacherRepo.findOneBy({ id })
  }


async findAllClasses(teacherId:number) {
    return await this.classSubjectTeacherService.teacherAllClasses(teacherId)
   
  }

  

  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }
 
  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
