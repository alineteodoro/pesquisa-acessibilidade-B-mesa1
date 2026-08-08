import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("aula")
export class AulaEntity {

    @PrimaryGeneratedColumn({name:"id_aula", type:"integer"})
    public id_aula: number;

    @Column({name:"id_modulo", type:"integer"})
    public id_modulo: number;

    @Column({name:"titulo", type:"varchar", length:200})
    public titulo: string;

    @Column({name:"ordem", type:"integer"})
    public ordem: number;

    @Column({name:"duracao", type:"integer"})
    public duracao: number;

}