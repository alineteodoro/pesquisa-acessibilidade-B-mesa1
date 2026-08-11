import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CriarCursoRequestDto {
    @ApiProperty({ description: "Nome do curso", example: "Introdução à acessibilidade", type: "string" })
    @IsString({ message: "O nome deve ser uma string." })
    @IsNotEmpty({ message: "O nome não pode estar vazio." })
    @MaxLength(200, { message: "O nome deve ter no máximo 200 caracteres." })
    public nome: string;

    @ApiProperty({ description: "Descrição do curso", example: "Curso introdutório sobre acessibilidade digital", type: "string" })
    @IsString({ message: "A descrição deve ser uma string." })
    @IsNotEmpty({ message: "A descrição não pode estar vazia." })
    public descricao: string;

    @ApiProperty({ description: "Duração do curso em horas", example: 40, type: "integer" })
    @IsInt({ message: "A duração deve ser um número inteiro." })
    @IsPositive({ message: "A duração deve ser maior que zero." })
    public duracao: number;

    @ApiProperty({ description: "Indica se o curso está ativo", example: true, type: "boolean" })
    @IsBoolean({ message: "O campo ativo deve ser um booleano." })
    public ativo: boolean;

    @ApiProperty({ description: "Categoria do curso", example: "Tecnologia", type: "string" })
    @IsString({ message: "A categoria deve ser uma string." })
    @IsNotEmpty({ message: "A categoria não pode estar vazia." })
    @MaxLength(120, { message: "A categoria deve ter no máximo 120 caracteres." })
    public categoria: string;
}
