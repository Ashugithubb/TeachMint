import { PartialType } from '@nestjs/mapped-types';
import { CreateClassSubjectTeacherDto } from './create-class-subject-teacher.dto';

export class UpdateClassSubjectTeacherDto extends PartialType(CreateClassSubjectTeacherDto) {}
