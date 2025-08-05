
import { Class } from "src/class/entities/class.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(['class', 'subject'])
@Entity('class_subject_teacher')
export class ClassSubjectTeacher {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, { eager: true })
  class: Class;

  @ManyToOne(() => Subject, { eager: true })
  subject: Subject;

  @ManyToOne(() => Teacher)
  teacher: Teacher;
}
