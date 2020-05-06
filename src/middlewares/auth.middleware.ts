import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdminService } from "src/services/admin/admin.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdminDto } from "src/dto/admin/auth/jwt.data.admin.dto";
import { jwtSecretKey } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly adminService: AdminService) {}

    async use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !== 2) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const tokenString = tokenParts[1];

        const jwtData: JwtDataAdminDto = jwt.verify(tokenString, jwtSecretKey);
        if(!jwtData) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const admin = await this.adminService.getById(jwtData.adminId);
        if(!admin) {
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }

        const trenutniTimestamp = new Date().getTime() / 1000;
        if(trenutniTimestamp >= jwtData.exp) {
            throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
        }

        next();
    }

}