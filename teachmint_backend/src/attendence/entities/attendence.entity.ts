import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from '../enum/attendence.status';

@Entity('attendences')
export class Attendence {
    @PrimaryColumn()
    classId: number;

    @PrimaryColumn()
    studentId: number;

    @PrimaryColumn()
    subjectId: number;

    @ManyToOne(() => Class)
    @JoinColumn({ name: 'classId' })
    class: Class;

    @ManyToOne(() => Student)
    @JoinColumn({ name: 'studentId' })
    student: Student;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'subjectId' })
    subject: Subject;

    @Column({ type: 'jsonb', default: {} })
    sessions: { [key: string]: Attendance };
}
