import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CriarModuloRequestDto {
    @ApiProperty({ description: "Identificador do curso", example: 1, type: "integer" })
    @IsInt({ message: "O id_curso deve ser um número inteiro." })
    @IsPositive({ message: "O id_curso deve ser maior que zero." })
    public id_curso: number;

    @ApiProperty({ description: "Título do módulo", example: "Módulo 1", type: "string" })
    @IsString({ message: "O título deve ser uma string." })
    @IsNotEmpty({ message: "O título não pode estar vazio." })
    @MaxLength(200, { message: "O título deve ter no máximo 200 caracteres." })
    public titulo: string;

    @ApiProperty({ description: "Ordem do módulo no curso", example: 1, type: "integer" })
    @IsInt({ message: "A ordem deve ser um número inteiro." })
    @IsPositive({ message: "A ordem deve ser maior que zero." })
    public ordem: number;
}
