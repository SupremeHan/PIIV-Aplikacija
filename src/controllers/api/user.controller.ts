import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "src/services/user/user.service";
import { User } from "src/entities/user.entity";
import { ApiResponse } from "src/misc/api.response";
import { async } from "rxjs/internal/scheduler/async";
import { resolve } from "dns";


@Controller('api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id') userId: number): Promise<User | ApiResponse> {
        return new Promise(async (resolve) => {
            let user = await this.userService.getById(userId);

            if(user == undefined) {
                resolve(new ApiResponse('error',-1002));
            }
            resolve(user);
        })
    }
    
}