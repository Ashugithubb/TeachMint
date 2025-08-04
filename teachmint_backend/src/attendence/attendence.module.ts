import { Module } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { AttendenceController } from './attendence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendence } from './entities/attendence.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Attendence])],
  controllers: [AttendenceController],
  providers: [AttendenceService],
  exports:[AttendenceService]
})
export class AttendenceModule {}
