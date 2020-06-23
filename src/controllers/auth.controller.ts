import { Controller, Post, Body, HttpException, HttpStatus, Req, Request } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { LoginAdminDto } from "src/dto/admin/auth/login.admin.dto";
import { ApiResponse } from "src/misc/api.response";
import * as crypto from "crypto";
import { LoginInfoAdminDto } from "src/dto/admin/auth/login.info.admin.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dto/admin/auth/jwt.data.admin.dto";
import { jwtSecretKey } from "config/jwt.secret";
import { JwtRefreshDto } from "src/dto/admin/auth/jwt.refresh.dto";
import { time } from "console";
import { AdminRefreshTokenDto } from "src/dto/admin/auth/admin.refresh.token.dto";

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
        jwtData.exp = this.getDatePlus(60 * 30);

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecretKey);



        const jwtRefreshData = new JwtRefreshDto();
        jwtRefreshData.adminId = jwtData.adminId;
        jwtRefreshData.username = jwtData.username;
        jwtRefreshData.exp = this.getDatePlus(60 * 60 * 24 * 31);

        let refreshToken: string = jwt.sign(jwtRefreshData.toPlainObject(), jwtSecretKey);

        const responseObj = new LoginInfoAdminDto(
            admin.adminId,
            admin.username,
            token,
            refreshToken,
            this.getIsoDate(jwtRefreshData.exp),
        );

        await this.adminService.addToken(admin.adminId, refreshToken, this.getDatabaseDateFormat(this.getIsoDate(jwtRefreshData.exp)));

        return new Promise(resolve => resolve(responseObj));
    }

    @Post('admin/refresh')
    async adminTokenRefresh(@Req() req: Request, @Body() data: AdminRefreshTokenDto): Promise<LoginInfoAdminDto | ApiResponse> {
        const adminToken = await this.adminService.getAdminToken(data.token);

        if(!adminToken) {
            return new ApiResponse('error',-10002,'No such refresh token');
        }

        if(adminToken.isValid === 0) {
            return new ApiResponse('error',-10003, 'The token is no longer valid');
        }

        const sada = new Date();
        const datumIsteka = new Date(adminToken.expiresAt.replace(" ", "T") + "Z");

        if(datumIsteka.getTime() < sada.getTime()) {
            return new ApiResponse('error',-10004, 'The token is no longer valid');
        }

        let jwtRefreshData: JwtRefreshDto;

        try {
            jwtRefreshData = jwt.verify(data.token, jwtSecretKey);
        } catch(e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if(!jwtRefreshData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const jwtData = new JwtDataAdminDto();
        jwtData.adminId = jwtRefreshData.adminId;
        jwtData.username = jwtRefreshData.username;
        jwtData.exp = this.getDatePlus(60 * 5);

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecretKey);

        const responseObj = new LoginInfoAdminDto(
            jwtData.adminId,
            jwtData.username,
            token,
            data.token,
            this.getIsoDate(jwtRefreshData.exp),
        );

        return responseObj;
    }


    private getDatePlus(numberOfSeconds: number): number {
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

    private getIsoDate(timestamp: number) {
        const date = new Date();
        date.setTime(timestamp * 1000);
        return date.toISOString();
    }

    private getDatabaseDateFormat(isoFormat: string): string {
        return isoFormat.substr(0,19).replace('T',' ');
    }
}