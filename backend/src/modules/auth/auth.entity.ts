import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuario")
export class AuthEntity{

    @PrimaryGeneratedColumn({name:"id_usuario", type:"integer"})
    public id_usuario:number;

    @Column({name:"nome", type:"varchar"})
    public nome:string;

    @Column({name:"email", type:"varchar"})
    public email:string;

    @Column({name:"senha_hash", type:"varchar"})
    senha_hash:string

    @Column({name:"dt_nascimento", type:"date"})
    dt_nascimento:Date

    @Column({name:"ativo", type:"boolean"})
    ativo:boolean

    @Column({name:"is_instrutor", type:"boolean"})
    is_instrutor:boolean

}