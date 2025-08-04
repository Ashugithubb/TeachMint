
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { HasingModule } from 'src/hasing/hasing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [AdminModule,HasingModule,ConfigModule,TeacherModule,JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
     signOptions: { expiresIn: '10m' }
    }),
    inject: [ConfigService],
    global: true,
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,
]
})
export class AuthModule { }