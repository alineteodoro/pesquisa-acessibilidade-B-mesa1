import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";

export class AtualizarProgressoRequestDto {
    @ApiPropertyOptional({ description: "Identificador da matrícula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_matricula deve ser um número inteiro." })
    @IsPositive({ message: "O id_matricula deve ser maior que zero." })
    public id_matricula?: number;

    @ApiPropertyOptional({ description: "Identificador da aula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_aula deve ser um número inteiro." })
    @IsPositive({ message: "O id_aula deve ser maior que zero." })
    public id_aula?: number;

    @ApiPropertyOptional({ description: "Indica se a aula foi concluída", example: true, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O campo concluido deve ser um booleano." })
    public concluido?: boolean;

    @ApiPropertyOptional({ description: "Data de conclusão", example: "2026-08-06T10:00:00.000Z", type: "string" })
    @IsOptional()
    @IsDateString({}, { message: "A data de conclusão deve ser uma data válida." })
    public dt_conclusao?: Date | string;
}
