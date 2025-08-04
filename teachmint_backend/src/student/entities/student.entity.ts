import { Class } from "src/class/entities/class.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({unique:true})
    email:string

     @ManyToOne(()=>Class,(c)=>c.students)                                                                                      
     class:Class

}
