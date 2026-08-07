import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CriarAulaRequestDto {
    @ApiProperty({ description: "Identificador do módulo", example: 1, type: "integer" })
    @IsInt({ message: "O id_modulo deve ser um número inteiro." })
    @IsPositive({ message: "O id_modulo deve ser maior que zero." })
    public id_modulo: number;

    @ApiProperty({ description: "Título da aula", example: "Introdução ao tema", type: "string" })
    @IsString({ message: "O título deve ser uma string." })
    @IsNotEmpty({ message: "O título não pode estar vazio." })
    @MaxLength(200, { message: "O título deve ter no máximo 200 caracteres." })
    public titulo: string;

    @ApiProperty({ description: "Ordem da aula no módulo", example: 1, type: "integer" })
    @IsInt({ message: "A ordem deve ser um número inteiro." })
    @IsPositive({ message: "A ordem deve ser maior que zero." })
    public ordem: number;

    @ApiProperty({ description: "Duração da aula em minutos", example: 45, type: "integer" })
    @IsInt({ message: "A duração deve ser um número inteiro." })
    @IsPositive({ message: "A duração deve ser maior que zero." })
    public duracao: number;
}
