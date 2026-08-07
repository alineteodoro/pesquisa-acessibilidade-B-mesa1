import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("progresso")
export class ProgressoEntity{

    @PrimaryGeneratedColumn({name:"id_progresso", type:"integer"})
    public id_progresso:number;

    @Column({name:"id_matricula", type:"integer"})
    public id_matricula:number;

    @Column({name:"id_aula", type:"integer"})
    public id_aula:number;

    @Column({name:"concluido", type:"boolean"})
    public concluido:boolean;

    @Column({name:"dt_conclusao", type:"timestamp"})
    public dt_conclusao:Date;

}