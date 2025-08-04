import { start } from "node:repl";
import { Admin } from "src/admin/entities/admin.entity";
import { ClassSubjectTeacher } from "src/class-subject-teacher/entities/class-subject-teacher.entity";
import { Student } from "src/student/entities/student.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('classes')
export class Class {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    name:string

    @Column({nullable:true})
    description:string

    @Column()
    acadmicYear:string

    @CreateDateColumn()
    createAt:Date
    
    @ManyToOne(()=>Admin ,(a)=>a.class)
    admin:Admin

    // @ManyToMany(()=>Teacher,(t)=>t.class)
    // @JoinTable()
    // teacher:Teacher[]


    @OneToMany(()=>Student,(s)=>s.class)
    students:Student[]

    // @ManyToMany(()=>Subject,(s)=>s.classes)
    // subject:Subject[]

 @OneToMany(() => ClassSubjectTeacher, (cst) => cst.class)
  classSubjectTeacher: ClassSubjectTeacher[];


}
