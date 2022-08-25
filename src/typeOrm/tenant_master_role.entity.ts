import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleMaster } from "./role_master.entity";


@Entity()
export class TenantMasterRole{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',name:'tenant_id'})
    tenantId:string

    // @Column()
    //  rolesId:string

    // @ManyToOne(()=>RoleMaster,role=>role.tenantRoles)
    // @JoinColumn({name:'role_id'})
    // roles:RoleMaster
    
}