import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AttendenceModule } from 'src/attendence/attendence.module';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports:[TypeOrmModule.forFeature([Student]),AttendenceModule,forwardRef(()=>ClassModule) ],
  controllers: [StudentController],
  providers: [StudentService],
  exports:[StudentService]
})
export class StudentModule {}
