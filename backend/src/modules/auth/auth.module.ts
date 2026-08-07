import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./auth.entity";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.services";
import { AuthRepository } from "./auth.repository";


@Module({
    controllers:[AuthController],
    exports:[TypeOrmModule],
    imports:[TypeOrmModule.forFeature([AuthEntity])],
    providers:[AuthServices, AuthRepository],
})
export class AuthModule{}