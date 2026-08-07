import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"modulo"})
export class ModuloEntity{

    @PrimaryGeneratedColumn({name:"id_modulo", type:"integer"})
    public id_modulo:number;

    @Column({name:"id_curso", type:"integer"})
    public id_curso:number;

    @Column({name:"titulo", type:"varchar", length:200})
    public titulo:string;

    @Column({name:"ordem", type:"integer"})
    public ordem:number;

}