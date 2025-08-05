import 'reflect-metadata';
import AppDataSource from 'src/data.source';
import StudentSeeder from './seeds/student.seed';
import TeacherSeeder from './seeds/teacher.seeds';


async function seed() {
  await AppDataSource.initialize();
  //  await new  StudentSeeder().run(AppDataSource);
   await new TeacherSeeder().run(AppDataSource);
  console.log('seeding complete');
}

seed();
