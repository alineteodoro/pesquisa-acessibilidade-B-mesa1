import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogarContaRequestDto {
    @ApiProperty({ description: "E-mail do usuário", example: "lucas@gmail.com", type: "string" })
    @IsString({ message: "O e-mail deve ser uma string." })
    @IsNotEmpty({ message: "O e-mail não pode estar vazio." })
    @IsEmail({}, { message: "Informe um e-mail válido." })
    public email: string;

    @ApiProperty({ description: "Senha do usuário", example: "12345678", type: "string" })
    @IsString({ message: "A senha deve ser uma string." })
    @IsNotEmpty({ message: "A senha não pode estar vazia." })
    public senha_hash: string;
}