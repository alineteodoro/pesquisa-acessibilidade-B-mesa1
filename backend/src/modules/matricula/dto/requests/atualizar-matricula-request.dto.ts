import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class AtualizarMatriculaRequestDto {
    @ApiPropertyOptional({ description: "Identificador do aluno", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_aluno deve ser um número inteiro." })
    @IsPositive({ message: "O id_aluno deve ser maior que zero." })
    public id_aluno?: number;

    @ApiPropertyOptional({ description: "Identificador do curso", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_curso deve ser um número inteiro." })
    @IsPositive({ message: "O id_curso deve ser maior que zero." })
    public id_curso?: number;

    @ApiPropertyOptional({ description: "Data da matrícula", example: "2026-08-06T10:00:00.000Z", type: "string" })
    @IsOptional()
    @IsDateString({}, { message: "A data da matrícula deve ser uma data válida." })
    public dt_matricula?: Date | string;

    @ApiPropertyOptional({ description: "Status da matrícula", example: "ativa", type: "string" })
    @IsOptional()
    @IsString({ message: "O status deve ser uma string." })
    @MaxLength(20, { message: "O status deve ter no máximo 20 caracteres." })
    public status?: string;
}
