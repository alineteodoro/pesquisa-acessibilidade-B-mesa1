import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./auth.entity";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.services";
import { AuthRepository } from "./auth.repository";
import { JwtModule } from '@nestjs/jwt';


@Module({
    controllers:[AuthController],
    exports:[TypeOrmModule, JwtModule],
    imports:[TypeOrmModule.forFeature([AuthEntity]), JwtModule.register({
        secret: process.env.JWT_SECRET || 'troque-esta-chave-em-producao',
        signOptions: { expiresIn: '8h' },
    })],
    providers:[AuthServices, AuthRepository],
})
export class AuthModule{}
