import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import { AttendenceService } from 'src/attendence/attendence.service';
import { ClassService } from 'src/class/class.service';
import { StudentQueryDto } from './dto/studetn.query.dto';

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

  async allStudents(query: StudentQueryDto) {
    const { page = 1, limit = 10, id, searchValue } = query;
    let where: FindOptionsWhere<Student>[] | FindOptionsWhere<Student> = {};
    if (searchValue) {
      where = [
        { name: ILike(`%${searchValue}%`) },
        { email: ILike(`%${searchValue}%`) },
      ];
     } //else if (id) {
    //   where = { id };
    // }
    const [student, total] = await this.studentRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      student,
      total,
      page,
      limit,
    };
  }

  async searchStudent(name: String) {
    const where: FindOptionsWhere<Student> = {};
    where.name = ILike(`%${name}%`);
    return this.studentRepo.find({
      where
    })
  }
  async removeStudentFomClass(studentId: number) {
    //    const student = await this.studentRepo.findOne(
    //     {
    //       where:{id:studentId},
    //       relations:['class']
    //     }
    //   );
    //  if(!student) throw new NotFoundException();
    //   student.class.
    //   console.log("student in stduent service,",studentId);
    //   const res = await this.studentRepo.update(studentId, {
    //     class: undefined
    //   })
    //   if(!res.affected)  throw new NotFoundException("student nt fund")
    //   return {
    // message: "student updated"}
    return "Student is n0t rem0ved fr0m class implement functi0n";
  }

}


// async searchStudent(name:string){
//   return await this.studentRepo.find({
//     where:{name:ILike(`%${name}`)}
//   })

// }