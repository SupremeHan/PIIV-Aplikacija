import { Controller, Get } from '@nestjs/common';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from 'src/entities/admin.entity';


@Controller()
export class AppController {
  constructor(
    private adminService: AdminService
  ) {}

  @Get()
  getHello(): string {
    return 'Hello mudafuka!';
  }

  
}
