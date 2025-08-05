import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SubjectService {
  constructor(@InjectRepository(Subject) private readonly subjectRepo:Repository<Subject>){}
  async create(createSubjectDto: CreateSubjectDto) {

    return await this.subjectRepo.save(createSubjectDto);
  }

  findAll() {
    return `This action returns all subject`;
  }

  async findOne(id: number) {
    return await this.subjectRepo.findOneBy({id});
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
