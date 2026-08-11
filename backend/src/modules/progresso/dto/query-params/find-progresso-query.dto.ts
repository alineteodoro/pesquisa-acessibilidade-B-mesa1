import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class FindProgressoQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por matrícula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_matricula deve ser um número inteiro." })
    @IsPositive({ message: "O id_matricula deve ser maior que zero." })
    public id_matricula?: number;

    @ApiPropertyOptional({ description: "Filtrar por aula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_aula deve ser um número inteiro." })
    @IsPositive({ message: "O id_aula deve ser maior que zero." })
    public id_aula?: number;
}
