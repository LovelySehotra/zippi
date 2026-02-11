import { Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiCreatedResponse } from "@nestjs/swagger";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @Post()
    login(@Body() userDto: any): Promise<any> {
        return this.authService.login(userDto);
    }
}