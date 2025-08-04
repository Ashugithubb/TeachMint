import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Admin } from 'src/admin/entities/admin.entity';
import { Class } from 'src/class/entities/class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Attendence } from 'src/attendence/entities/attendence.entity';
import { Student } from 'src/student/entities/student.entity';
import { ClassSubjectTeacher } from 'src/class-subject-teacher/entities/class-subject-teacher.entity';


export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities:[Admin,Class,Teacher,Subject,Attendence,Student,ClassSubjectTeacher],
    synchronize: true,
  }),
};