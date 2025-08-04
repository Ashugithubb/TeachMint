import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import { AttendenceService } from 'src/attendence/attendence.service';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    private readonly attendenceService: AttendenceService,
    @Inject(forwardRef(() => ClassService))
    private readonly classService: ClassService
  ) { }

  async SeeAllStudentsWhichareNotInAnyClass() {
    return this.studentRepo.find({
      where: { class: IsNull() }
    })
  }

  async blockUnblockStudent(studentId: number) {
    const existing = await this.studentRepo.findOneBy({ id: studentId });
    if (existing) {
      return await this.studentRepo.softDelete(studentId);
    }
    return await this.studentRepo.restore(studentId);
  }

  async findOne(userId: number) {
    return await this.studentRepo.findOne({
      where: { id: userId }, withDeleted: false
    }
    );
  }

  async StudentSubjectWiseAttencePercentage(studentId: number, subjectId: number) {
    const attendence = await this.attendenceService.findStudentAttendenceSubjectWise(studentId, subjectId);

    const studentAttendedSessions = attendence?.sessions;

    let present = 0;
    let absent = 0;

    for (const key in studentAttendedSessions) {
      const value = studentAttendedSessions[key];
      if (value === 'Present') {
        present++
      }
      if (value === 'Absent') {
        absent++
      }
    }

    const subjectPercentage = (present / (present + absent)) * 100;
    const total = present + absent;
    return {
      "Your Subject Percentage is": subjectPercentage,
      "Subject Sessions Completed": (present + absent),
      "You are Absent in": absent,
      "Total Clases Left of this Subject": (30 - (total))
    }

  }

  async studentOverAllAttendencePercentage(studentId: number) {
    const studentAttendence = await this.attendenceService.findStudentAttendence(studentId);

    const totalSubjects = studentAttendence.length;

    let subjectWisePercentage = 0;
    for (const subject of studentAttendence) {
      const result = await this.StudentSubjectWiseAttencePercentage(subject.studentId, subject.studentId);
      const percentage = result['Your Subject Percentage is'];

      subjectWisePercentage += percentage

    }
    console.log(subjectWisePercentage)
    const classPercetage = subjectWisePercentage / totalSubjects

    return { "your Attendance percentage is ": `${classPercetage}%` }
  }


  async myClassInfomation(studentId: number) {
    const classInfo = await this.classService.studentClassInfo(studentId);
    return classInfo;
  }

  // async searchStudent(name:string){
  //   return await this.studentRepo.find({
  //     where:{name:ILike(`%${name}`)}
  //   })

  // }
  
  async searchStudent(name: String) {
    const where: FindOptionsWhere<Student> = {};
    where.name = ILike(`%${name}%`);
    return this.studentRepo.find({
      where
    })
  }

}
