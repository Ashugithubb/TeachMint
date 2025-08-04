import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { HasingService } from 'src/hasing/hasing.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly hasingService: HasingService,
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService) { }

  async create(createAdminDto: CreateAdminDto) {
    const { email } = createAdminDto;

    const existing = await this.adminRepo.findOneBy({ email });
    if (existing) throw new ForbiddenException("Admin Already Exist");

    createAdminDto.password = await this.hasingService.hashPassword(createAdminDto.password);

    await this.adminRepo.save(createAdminDto);

    return "Admin Registred SuccessFully";
  }

  async findOne(id: number) {
    return await this.adminRepo.findOneBy({ id });
  }
  async findOneByemail(email) {
    const user = await this.adminRepo.findOneBy({ email });
    // console.log("yaha aaya", user);
    return user;
  }

  async blockUnblockTeachers(teacherId: number) {
    return this.teacherService.blockUnblockTeacher(teacherId)
  }

  async blockUnblockStudents(studentId: number) {
    return await this.studentService.blockUnblockStudent(studentId);
  }

}
