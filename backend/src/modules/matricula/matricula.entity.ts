import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("matricula")
export class MatriculaEntity {

    @PrimaryGeneratedColumn({name:"id_matricula", type:"integer"})
    public id_matricula: number;

    @Column({name:"id_aluno", type:"integer"})
    public id_aluno: number;

    @Column({name:"id_curso", type:"integer"})
    public id_curso: number;

    @Column({name:"dt_matricula", type:"timestamp"})
    public dt_matricula: Date;

    @Column({name:"status", type:"varchar", length: 20})
    public status: string;

}