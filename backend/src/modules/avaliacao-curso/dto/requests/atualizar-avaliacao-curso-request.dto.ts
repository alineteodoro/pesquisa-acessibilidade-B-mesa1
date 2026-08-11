import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class AtualizarAvaliacaoCursoRequestDto {
    @ApiPropertyOptional({ description: "Identificador da matrícula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_matricula deve ser um número inteiro." })
    @IsPositive({ message: "O id_matricula deve ser maior que zero." })
    public id_matricula?: number;

    @ApiPropertyOptional({ description: "Comentário da avaliação", example: "Ótimo curso", type: "string" })
    @IsOptional()
    @IsString({ message: "O comentário deve ser uma string." })
    public comentario?: string;

    @ApiPropertyOptional({ description: "Data da avaliação", example: "2026-08-06T10:00:00.000Z", type: "string" })
    @IsOptional()
    @IsDateString({}, { message: "A data da avaliação deve ser uma data válida." })
    public dt_avaliacao?: Date | string;

    @ApiPropertyOptional({ description: "Nota da avaliação", example: 5, type: "integer" })
    @IsOptional()
    @IsInt({ message: "A nota deve ser um número inteiro." })
    @Min(0, { message: "A nota não pode ser menor que 0." })
    @Max(5, { message: "A nota não pode ser maior que 5." })
    public nota?: number;


    @ApiPropertyOptional({ description: "Estrelas da avaliação", example: 5, type: "integer" })
    @IsOptional()
    @IsInt({ message: "As estrelas devem ser um número inteiro." })
    @Min(0, { message: "As estrelas não podem ser menores que 0." })
    @Max(5, { message: "As estrelas não podem ser maiores que 5." })
    public estrelas?: number;
}
