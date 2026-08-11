import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsPositive } from "class-validator";

export class CriarProgressoRequestDto {
    @ApiProperty({ description: "Identificador da matrícula", example: 1, type: "integer" })
    @IsInt({ message: "O id_matricula deve ser um número inteiro." })
    @IsPositive({ message: "O id_matricula deve ser maior que zero." })
    public id_matricula: number;

    @ApiProperty({ description: "Identificador da aula", example: 1, type: "integer" })
    @IsInt({ message: "O id_aula deve ser um número inteiro." })
    @IsPositive({ message: "O id_aula deve ser maior que zero." })
    public id_aula: number;

    @ApiProperty({ description: "Indica se a aula foi concluída", example: true, type: "boolean" })
    @IsBoolean({ message: "O campo concluido deve ser um booleano." })
    public concluido: boolean;

    @ApiProperty({ description: "Data de conclusão", example: "2026-08-06T10:00:00.000Z", type: "string" })
    @IsDateString({}, { message: "A data de conclusão deve ser uma data válida." })
    public dt_conclusao: Date | string;
}
