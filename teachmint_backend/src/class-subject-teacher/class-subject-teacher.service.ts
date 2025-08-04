import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassSubjectTeacherDto } from './dto/create-class-subject-teacher.dto';
import { UpdateClassSubjectTeacherDto } from './dto/update-class-subject-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassSubjectTeacher } from './entities/class-subject-teacher.entity';
import { Repository } from 'typeorm';
import { SubjectService } from 'src/subject/subject.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { Student } from 'src/student/entities/student.entity';
import { ClassService } from 'src/class/class.service';
import { AttendenceService } from 'src/attendence/attendence.service';

@Injectable()
export class ClassSubjectTeacherService {
  constructor(@InjectRepository(ClassSubjectTeacher) private readonly classSubjectTeacherRepo: Repository<ClassSubjectTeacher>,
    private readonly subjectService: SubjectService,

    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,

    @Inject(forwardRef(() => ClassService))
    private readonly classService: ClassService,

    @Inject(forwardRef(() => AttendenceService))
    private readonly attendenceService: AttendenceService
  ) { }


  async assignTeacherToSubjectInClass(createClassSubjectTeacherDto: CreateClassSubjectTeacherDto) {
    const { classId, subjectId, teacherId } = createClassSubjectTeacherDto;

    const cls = await this.classService.findOne(classId);

    const subject = await this.subjectService.findOne(subjectId);
    const teacher = await this.teacherService.findOne(teacherId);

    if (!cls || !subject || !teacher) {
      throw new BadRequestException('Invalid class, subject or teacher');
    }

    const existing = await this.classSubjectTeacherRepo.findOne({
      where: {
        class: { id: classId },
        subject: { id: subjectId },
        teacher: { id: teacherId }
      }
    })

    if (existing) throw new ConflictException("Already Exist");

    const classSubjectTeacher = this.classSubjectTeacherRepo.create({
      class: cls,
      subject,
      teacher,
    });

    const studentsIdList = await this.classService.findClassStudents(classId);
    await this.classSubjectTeacherRepo.save(classSubjectTeacher);
    await this.attendenceService.addStudentAttendanceSubjectWise(classId, subjectId, studentsIdList);
    return { "msg": "subject and Teacher is added to class" }
  }

  async findOne(classId:number,subjectId:number,teacherId:number) {
    return await this.classSubjectTeacherRepo.findOne({
      where:{
        class:{id:classId},
        subject:{id:subjectId},
        teacher:{id:teacherId}
      }
    })
  }



}
