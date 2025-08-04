import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { AttendenceModule } from './attendence/attendence.module';
import { ClassSubjectTeacherModule } from './class-subject-teacher/class-subject-teacher.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),TypeOrmModule.forRootAsync(typeOrmConfig),AuthModule,AdminModule, ClassModule, 
    TeacherModule, StudentModule, SubjectModule, 
    AttendenceModule, ClassSubjectTeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
