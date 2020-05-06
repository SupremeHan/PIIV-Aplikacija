import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { AddUserDto } from "src/dto/user/add.user.dto";
import * as crypto from "crypto";
import { resolve } from "dns";
import { ApiResponse } from "src/misc/api.response";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>
    ) {}

    getAll(): Promise<User[]> {
        return this.user.find();
    }

    getById(id: number): Promise<User> {
        return this.user.findOne(id);
    }

    add(data: AddUserDto): Promise<User | ApiResponse> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newUser: User = new User();
        newUser.email = data.email;
        newUser.passwordHash = data.password;
        newUser.forname = data.forname;
        newUser.surname = data.surname;
        newUser.phoneNumber = data.phoneNumber;
        newUser.adress = data.adress;

        return new Promise((resolve) => {
            this.user.save(newUser)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse('error',-1001);
                resolve(response);
            });
        })
    }
}