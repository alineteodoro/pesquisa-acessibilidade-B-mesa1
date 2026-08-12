import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class AtualizarCursoRequestDto {
    @ApiPropertyOptional({ description: "Nome do curso", example: "Introdução à acessibilidade", type: "string" })
    @IsOptional()
    @IsString({ message: "O nome deve ser uma string." })
    @MaxLength(200, { message: "O nome deve ter no máximo 200 caracteres." })
    public nome?: string;

    @ApiPropertyOptional({ description: "Descrição do curso", example: "Curso introdutório sobre acessibilidade digital", type: "string" })
    @IsOptional()
    @IsString({ message: "A descrição deve ser uma string." })
    public descricao?: string;

    @ApiPropertyOptional({ description: "ID do usuário", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O ID do usuário deve ser um número inteiro." })
    @IsPositive({ message: "O ID do usuário deve ser maior que zero." })
    public id_usuario?: number;

    @ApiPropertyOptional({ description: "Duração do curso em horas", example: 40, type: "integer" })
    @IsOptional()
    @IsInt({ message: "A duração deve ser um número inteiro." })
    @IsPositive({ message: "A duração deve ser maior que zero." })
    public duracao?: number;

    @ApiPropertyOptional({ description: "Indica se o curso está ativo", example: true, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O campo ativo deve ser um booleano." })
    public ativo?: boolean;

    @ApiPropertyOptional({ description: "Categoria do curso", example: "Tecnologia", type: "string" })
    @IsOptional()
    @IsString({ message: "A categoria deve ser uma string." })
    @MaxLength(120, { message: "A categoria deve ter no máximo 120 caracteres." })
    public categoria?: string;
}
