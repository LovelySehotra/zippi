import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";

export class AuthService {
    constructor(@InjectRepository(User) private readonly userRespository: Repository<User>) { }
    async login(loginData: any): Promise<any> {
        return { status: 200, message: "Success" }
    }
}