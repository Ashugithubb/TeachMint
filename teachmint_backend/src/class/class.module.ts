import { forwardRef, Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { AdminModule } from 'src/admin/admin.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports:[TypeOrmModule.forFeature([Class]),forwardRef(() => AdminModule),StudentModule],
  controllers: [ClassController],
  providers: [ClassService],
  exports:[ClassService]
})
export class ClassModule {}
