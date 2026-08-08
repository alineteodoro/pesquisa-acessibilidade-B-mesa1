import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CriarMatriculaRequestDto {
    @ApiProperty({ description: "Identificador do aluno", example: 1, type: "integer" })
    @IsInt({ message: "O id_aluno deve ser um número inteiro." })
    @IsPositive({ message: "O id_aluno deve ser maior que zero." })
    public id_aluno: number;

    @ApiProperty({ description: "Identificador do curso", example: 1, type: "integer" })
    @IsInt({ message: "O id_curso deve ser um número inteiro." })
    @IsPositive({ message: "O id_curso deve ser maior que zero." })
    public id_curso: number;

    @ApiProperty({ description: "Data da matrícula", example: "2026-08-06T10:00:00.000Z", type: "string" })
    @IsDateString({}, { message: "A data da matrícula deve ser uma data válida." })
    public dt_matricula: Date | string;

    @ApiProperty({ description: "Status da matrícula", example: "ativa", type: "string" })
    @IsString({ message: "O status deve ser uma string." })
    @IsNotEmpty({ message: "O status não pode estar vazio." })
    @MaxLength(20, { message: "O status deve ter no máximo 20 caracteres." })
    public status: string;
}
