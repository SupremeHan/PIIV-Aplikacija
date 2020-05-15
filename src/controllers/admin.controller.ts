import { Controller, Get, Param, Body, Put, Post } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { Admin } from "src/entities/admin.entity";
import { AddAdminDto } from "src/dto/admin/add.admin.dto";
import { EditAdminDto } from "src/dto/admin/edit.admin.dto";
import { ApiResponse } from "src/misc/api.response";
import { resolve } from "dns";
import { async } from "rxjs/internal/scheduler/async";


@Controller('api/admin')
export class AdminController {
    constructor(
        private adminService: AdminService
    ) {}

    @Get()
    getAll(): Promise<Admin[]> {
        return this.adminService.getAll();
    }

    @Get(':id')
    getById(@Param('id') adminId: number): Promise<Admin | ApiResponse> {
        return new Promise(async (resolve) => {
            let admin = await this.adminService.getById(adminId);

            if(admin === undefined) {
                resolve(new ApiResponse('error',-1002));
            }
            resolve(admin);
        })
        
    }

    @Put()
    add(@Body() data: AddAdminDto): Promise<Admin | ApiResponse> {
        return this.adminService.add(data);
    }

    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdminDto): Promise<Admin | ApiResponse> {
        return this.adminService.editById(id, data);
    }
}