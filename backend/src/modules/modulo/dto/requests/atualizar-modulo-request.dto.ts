import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class AtualizarModuloRequestDto {
    @ApiPropertyOptional({ description: "Identificador do curso", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_curso deve ser um número inteiro." })
    @IsPositive({ message: "O id_curso deve ser maior que zero." })
    public id_curso?: number;

    @ApiPropertyOptional({ description: "Título do módulo", example: "Módulo 1", type: "string" })
    @IsOptional()
    @IsString({ message: "O título deve ser uma string." })
    @MaxLength(200, { message: "O título deve ter no máximo 200 caracteres." })
    public titulo?: string;

    @ApiPropertyOptional({ description: "Ordem do módulo no curso", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "A ordem deve ser um número inteiro." })
    @IsPositive({ message: "A ordem deve ser maior que zero." })
    public ordem?: number;
}
