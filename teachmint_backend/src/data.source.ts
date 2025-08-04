import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Admin } from './admin/entities/admin.entity';
import { Class } from './class/entities/class.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { Subject } from './subject/entities/subject.entity';
import { Attendence } from './attendence/entities/attendence.entity';
import { Student } from './student/entities/student.entity';
import { ClassSubjectTeacher } from './class-subject-teacher/entities/class-subject-teacher.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
 entities:[Admin,Class,Teacher,Subject,Attendence,Student,ClassSubjectTeacher],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: true,
});
export default AppDataSource;