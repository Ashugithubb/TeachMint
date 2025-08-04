import { ClassSubjectTeacher } from "src/class-subject-teacher/entities/class-subject-teacher.entity";
import { Class } from "src/class/entities/class.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string


    @Column()
    courseCode:string

    @Column()
    description:string

    // @ManyToMany(()=>Teacher,(t)=>t.subjects)
    // teachers:Teacher[]

    // @ManyToMany(()=>Class,(c)=>c.subject)
    // classes:Class[]
 @OneToMany(() => ClassSubjectTeacher, (cst) => cst.class)
  classSubjectTeacher: ClassSubjectTeacher[];


}
