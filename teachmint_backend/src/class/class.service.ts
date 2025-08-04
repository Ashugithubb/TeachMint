import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { AuroraMysqlQueryRunner } from 'typeorm/driver/aurora-mysql/AuroraMysqlQueryRunner.js';
import { AdminService } from 'src/admin/admin.service';
import { AddStudentToClassDto } from './dto/add-student-to-class.dto';
import { StudentService } from 'src/student/student.service';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private readonly classRepo: Repository<Class>,
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService,
    private readonly stduentService: StudentService,
  ) { }

  async create(createClassDto: CreateClassDto, adminId: number) {
    const admin = await this.adminService.findOne(adminId);

    if (!admin) throw new BadRequestException("Admin does not exist");

    const name = createClassDto.name;
    
    const existingClass = await this.classRepo.findOneBy({name});
    if(existingClass) throw new ConflictException("This class Already Exsit");

    const newClass = this.classRepo.create({
      ...createClassDto,
      admin
    })
    return this.classRepo.save(newClass);
  }

  async addStudentToClass(addStudentToClassDto: AddStudentToClassDto) {
    const { classId, studentId } = addStudentToClassDto
    const classEntity = await this.classRepo.findOne({
      where: { id: classId },
      // relations: ["students"]
    });
    const student = await this.stduentService.findOne(studentId);

    if (!classEntity || !student) throw new BadRequestException("Class or Student not exist");

    const existing = await this.classRepo.findOne({
      where: { id: classId, students: { id: studentId } },
    })
    if (existing) throw new ConflictException("Student Aready Part of this class");


    classEntity.students.push(student)

    await this.classRepo.save(classEntity);
    return "student Added to class";

  }

  async findClassStudents(classId: number): Promise<number[]> {
    const classEntity = await this.classRepo.findOne({
      where: { id: classId },
      relations: ['students'],
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return classEntity.students.map((student) => student.id);
  }


  async findOne(id: number) {
    return await this.classRepo.findOneBy({ id });
  }

  async studentClassInfo(studentId: number) {
    const studentClass = await this.classRepo.find({
      where: { students: { id: studentId } },
      select: ["id"]
    })
    const classId = studentClass[0].id;
    return await this.classRepo.find({
      where: { id: classId },
      relations: ['students']
    })
  }

  async allClasses() {
    return await this.classRepo.find()
  }

  async removeStudentFromClasse(studentId:number){
   
     return await this.stduentService.removeStudentFomClass(studentId);
  }

}





























// return classEntity.students.map((s) => ({
//   id: s.id,
//   name: s.name,
// }));