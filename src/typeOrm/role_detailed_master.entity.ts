import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMaster } from "./role_master.entity";

@Entity()
export class RoleDetailedMaster{
@PrimaryGeneratedColumn()
id:number

@Column({type:'varchar',name:'role_name'})
roleName:string

@Column({type:'varchar',length:70,name:'role_desc'})
roleDesc:string

@Column({type:'boolean',name:'role_status'})
roleStatus:boolean

 @OneToMany(()=>RoleMaster,role=>role.roleDetails)
 roles:RoleMaster[]
}