import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { DataSource } from 'typeorm';




export default class StudentSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const studentRepo = dataSource.getRepository(Student);



    const students: Student[] = [];

    students.push(
      studentRepo.create({
        name: 'Harish Garg',
        email: 'hasrish123@gmail.com'
      },
      ),
    );



    await studentRepo.save(students);

  }
}

// {
//           name: 'Ayush Kumar',
//           email: 'ayush@gmail.com'
//         }
