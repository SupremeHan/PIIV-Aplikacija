import { Controller, Post, Body } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { LoginAdminDto } from "src/dto/admin/auth/login.admin.dto";
import { ApiResponse } from "src/misc/api.response";
import * as crypto from "crypto";
import { LoginInfoAdminDto } from "src/dto/admin/auth/login.info.admin.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dto/admin/auth/jwt.data.admin.dto";
import { jwtSecretKey } from "config/jwt.secret";

@Controller('auth')
export class AuthController {
    constructor(public adminService: AdminService) {}

    @Post('login')
    async doLogin(@Body() data: LoginAdminDto): Promise<LoginInfoAdminDto | ApiResponse> {
        const admin = await this.adminService.getByUsername(data.username);

        if(!admin) {
            return new Promise(resolve => resolve(new ApiResponse('error',-3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(admin.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error',-3002)));
        }

        const jwtData = new JwtDataAdminDto();
        jwtData.adminId = admin.adminId;
        jwtData.username = admin.username;

        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.exp = istekTimestamp;

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecretKey);

        const responseObj = new LoginInfoAdminDto(
            admin.adminId,
            admin.username,
            token
        );

        return new Promise(resolve => resolve(responseObj));
    }

}