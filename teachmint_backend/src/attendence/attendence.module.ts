import { forwardRef, Module } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { AttendenceController } from './attendence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendence } from './entities/attendence.entity';
import { ClassSubjectTeacherModule } from 'src/class-subject-teacher/class-subject-teacher.module';

@Module({
  imports:[TypeOrmModule.forFeature([Attendence]),forwardRef(() =>ClassSubjectTeacherModule)],
  controllers: [AttendenceController],
  providers: [AttendenceService],
  exports:[AttendenceService]
})
export class AttendenceModule {}
