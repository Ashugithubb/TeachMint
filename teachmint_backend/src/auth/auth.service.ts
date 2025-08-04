import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { HasingService } from 'src/hasing/hasing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { AuthJwtPayload } from './type/auth.payload';
import { AdminService } from 'src/admin/admin.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { Teacher } from 'src/teacher/entities/teacher.entity';


@Injectable()
export class AuthService {
    constructor(private adminService: AdminService,
        private hasingService: HasingService,
        private jwtService: JwtService,
        private readonly teacherService: TeacherService,
        private configService: ConfigService,) { }

    async validateUser({ email, password }: { email: string, password: string }) {

        const user = await this.adminService.findOneByemail(email);
        let admin: Teacher | null;
        if (!user) {
            admin = await this.teacherService.findOneByemail(email);
            if (!admin) throw new UnauthorizedException("User email not found");
            const matched = await this.hasingService.compare(password, admin.password);
            if (!matched) throw new UnauthorizedException("Invalid password");
            return { email: admin.email, id: admin.id };
        }
        console.log("yaha user kya ayaa", user);
        if (!user) throw new UnauthorizedException("User email not found");
        const matched = await this.hasingService.compare(password, user.password);
        if (!matched) throw new UnauthorizedException("Invalid password");
        return { email: user.email, id: user.id };
    }


    async login(payload: AuthJwtPayload, res: Response) {

        const token = await this.jwtService.sign(payload)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 10000,
        });
        return {
            "msg": "Loged In Successfully"
        }
    }

}



