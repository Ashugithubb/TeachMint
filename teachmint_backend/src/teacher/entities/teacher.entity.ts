
import { ClassSubjectTeacher } from "src/class-subject-teacher/entities/class-subject-teacher.entity";
import { Class } from "src/class/entities/class.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    // @ManyToMany(()=>Class,(c)=>c.teacher)
    // class:Class[] 
    
    
    // @ManyToMany(()=>Subject,(s)=>s.teachers)
    // @JoinTable()
    // subjects:Subject[]
@OneToMany(() => ClassSubjectTeacher, (cst) => cst.class)
  classSubjectTeacher: ClassSubjectTeacher[];

  @DeleteDateColumn()
  deletedAt:Date
}
