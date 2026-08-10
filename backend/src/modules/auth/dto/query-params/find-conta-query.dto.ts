import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class FindContaQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por nome do usuário", example: "Lucas", type: "string" })
    @IsOptional()
    @IsString({ message: "O nome deve ser uma string." })
    public nome?: string;

    @ApiPropertyOptional({ description: "Filtrar por e-mail", example: "lucas@gmail.com", type: "string" })
    @IsOptional()
    @IsEmail({}, { message: "Informe um e-mail válido." })
    public email?: string;

    @ApiPropertyOptional({ description: "Filtrar por status ativo", example: true, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O ativo deve ser um booleano." })
    public ativo?: boolean;
}
