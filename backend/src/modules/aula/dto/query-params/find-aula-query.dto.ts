import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class FindAulaQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por módulo", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_modulo deve ser um número inteiro." })
    @IsPositive({ message: "O id_modulo deve ser maior que zero." })
    public id_modulo?: number;

    @ApiPropertyOptional({ description: "Filtrar por título da aula", example: "Introdução", type: "string" })
    @IsOptional()
    @IsString({ message: "O título deve ser uma string." })
    @MaxLength(200, { message: "O título deve ter no máximo 200 caracteres." })
    public titulo?: string;
}
