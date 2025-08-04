import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { Teacher } from 'src/teacher/entities/teacher.entity';



export default class TeacherSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const teacherRepo = dataSource.getRepository(Teacher);



    const teachers: Teacher[] = [];
const password = await bcrypt.hash('password123', 10); 
    teachers.push(
      
      teacherRepo.create({
        name: 'Varinder Sir',
        password:`${password}`,
        email: 'vari@gmail.com'
      },
      ),
    );
    teachers.push(
     teacherRepo.create({
        name: 'Manjeet Mam',
        password:`${password}`,
        email: 'manjeet@gmail.com'
      },
      ),
    );

    await teacherRepo.save(teachers);

  }
}

