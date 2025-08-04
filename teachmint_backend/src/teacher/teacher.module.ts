import { forwardRef, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { ClassSubjectTeacherModule } from 'src/class-subject-teacher/class-subject-teacher.module';
import { AttendenceModule } from 'src/attendence/attendence.module';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher]),forwardRef(() => ClassSubjectTeacherModule),forwardRef(() => AttendenceModule)],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports:[TeacherService]
})
export class TeacherModule {}
