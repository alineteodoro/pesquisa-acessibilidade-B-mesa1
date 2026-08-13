import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class FindAvaliacaoCursoQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por matrícula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_matricula deve ser um número inteiro." })
    @IsPositive({ message: "O id_matricula deve ser maior que zero." })
    public id_matricula?: number;

    @ApiPropertyOptional({ description: "Filtrar por curso", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_curso deve ser um número inteiro." })
    @IsPositive({ message: "O id_curso deve ser maior que zero." })
    public id_curso?: number;
}
