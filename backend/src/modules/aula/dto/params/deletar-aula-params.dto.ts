import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class DeletarAulaParamsDto {
    @ApiProperty({ description: "Identificador da aula", example: 1, type: "integer" })
    @IsInt({ message: "O id deve ser um número inteiro." })
    @IsPositive({ message: "O id deve ser maior que zero." })
    public id: number;
}
