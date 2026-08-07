import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class FindConteudoQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por aula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_aula deve ser um número inteiro." })
    @IsPositive({ message: "O id_aula deve ser maior que zero." })
    public id_aula?: number;

    @ApiPropertyOptional({ description: "Filtrar por tipo de conteúdo", example: "video", type: "string" })
    @IsOptional()
    @IsString({ message: "O tipo deve ser uma string." })
    @MaxLength(20, { message: "O tipo deve ter no máximo 20 caracteres." })
    public tipo?: string;
}
