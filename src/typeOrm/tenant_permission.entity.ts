import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMaster } from "./role_master.entity";
import { TenantRoles } from "./tenant_roles.entity";


@Entity()
export class TenantPermission{
    @PrimaryGeneratedColumn()
    id:number

    // @Column({name:'permission_id'})
    // permissionId:number

   
    @Column({name:'product_master_id'})
    productMasterId:number

    @Column({})
    route:string

    @Column({name:'sub_route'})
    subRoute:string

    @Column({name:'action_id'})
    actionId:number
    
    @OneToMany(()=>TenantRoles,TenantRoles=>TenantRoles.permissions)
  tenantRoles:TenantRoles[]

}