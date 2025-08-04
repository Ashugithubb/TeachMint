import { forwardRef, Module } from '@nestjs/common';
import { ClassSubjectTeacherService } from './class-subject-teacher.service';
import { ClassSubjectTeacherController } from './class-subject-teacher.controller';
import { ClassModule } from 'src/class/class.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SubjectModule } from 'src/subject/subject.module';
import { ClassSubjectTeacher } from './entities/class-subject-teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendenceModule } from 'src/attendence/attendence.module';

@Module({
  imports:[TypeOrmModule.forFeature([ClassSubjectTeacher]),forwardRef(() => ClassModule),forwardRef(() =>TeacherModule),SubjectModule,AttendenceModule],
  controllers: [ClassSubjectTeacherController],
  providers: [ClassSubjectTeacherService],
  exports:[ClassSubjectTeacherService]
})
export class ClassSubjectTeacherModule {}
