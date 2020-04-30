import { Controller, Get, Param, Body, Put, Post } from "@nestjs/common";
import { AdminService } from "src/services/admin/admin.service";
import { Admin } from "entities/admin.entity";
import { AddAdminDto } from "src/dto/admin/add.admin.dto";
import { EditAdminDto } from "src/dto/admin/edit.admin.dto";


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
    getById(@Param('id') adminId: number): Promise<Admin> {
        return this.adminService.getById(adminId);
    }

    @Put()
    add(@Body() data: AddAdminDto): Promise<Admin> {
        return this.adminService.add(data);
    }

    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdminDto): Promise<Admin> {
        return this.adminService.editById(id, data);
    }
}