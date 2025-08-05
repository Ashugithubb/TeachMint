import { Injectable } from '@nestjs/common';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { Attendence } from './entities/attendence.entity';
import { StudentAttendanceUpdateDto } from './dto/teacher-update-attendance.dto';

@Injectable()
export class AttendenceService {
  constructor(@InjectRepository(Attendence) private readonly attendaceRepo: Repository<Attendence>) { }

  async addStudentAttendanceSubjectWise(classId: number, subjectId: number, students: number[]) {
    students.forEach(async (id, indx) => {
      const attendanceEntry = this.attendaceRepo.create({
        classId,
        subjectId,
        studentId: id
      })
      await this.attendaceRepo.save(attendanceEntry);
    })
  }

  async findAttendenceList(classId, subjectId) {
    return this.attendaceRepo.find({
      where: { classId, subjectId }
    })
  }

  async MarkStudentsAttendeance(dto: StudentAttendanceUpdateDto) {
    const { classId, subjectId, students } = dto;
    const studentIds = students.map((s) => s.studentId);

    const studentRecordsInDb = await this.attendaceRepo.find({
      where: {
        classId,
        subjectId,
        studentId: In(studentIds),
      },
    });

    const studentRecordsMap = new Map<number, Attendence>();
    for (const record of studentRecordsInDb) {
      studentRecordsMap.set(record.studentId, record);
    }

    const toSave: Attendence[] = [];

    for (const student of students) {
      const { studentId, sessions } = student;

      const existing = studentRecordsMap.get(studentId);

      if (existing) {
        existing.sessions = {
          ...existing.sessions,
          ...sessions,
        };
        toSave.push(existing);
      } else {
        const newRecord = this.attendaceRepo.create({
          classId,
          subjectId,
          studentId,
          sessions,
        });
        toSave.push(newRecord);
      }
    }
    await this.attendaceRepo.save(toSave);

    return { message: 'Attendance updated successfully', total: toSave.length };
  }

  async findStudentAttendenceSubjectWise(studentId: number, subjectId: number) {
    return await this.attendaceRepo.findOne({
      where: { studentId, subjectId }
    })
  }

  async findStudentAttendence(studentId: number) {
    return await this.attendaceRepo.find({
      where: { studentId }
    })
  }
}


// async MarkStudentAttendeance(dto: StudentAttendanceUpdateDto) {
//  const {classId,subjectId,students} = dto;
//  students.forEach(async (s,indx)=>{
//     const studenId =  s.studentId
//     const sessions =   s.sessions[0]
//     await this.attendaceRepo.create({
//       classId,
//       subjectId,
//       studenId,
//       sessions
//     })

//  })
// }