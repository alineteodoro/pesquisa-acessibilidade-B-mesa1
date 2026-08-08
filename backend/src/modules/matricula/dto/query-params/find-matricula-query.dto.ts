import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class FindMatriculaQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por aluno", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_aluno deve ser um número inteiro." })
    @IsPositive({ message: "O id_aluno deve ser maior que zero." })
    public id_aluno?: number;

    @ApiPropertyOptional({ description: "Filtrar por curso", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_curso deve ser um número inteiro." })
    @IsPositive({ message: "O id_curso deve ser maior que zero." })
    public id_curso?: number;

    @ApiPropertyOptional({ description: "Filtrar por status", example: "ativa", type: "string" })
    @IsOptional()
    @IsString({ message: "O status deve ser uma string." })
    @MaxLength(20, { message: "O status deve ter no máximo 20 caracteres." })
    public status?: string;
}
