import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserActionMaster } from "./action.entity";
import { ProductMaster } from "./product.entity";
import { RoleMaster } from "./role_master.entity";
import { TenantRoles } from "./tenant_roles.entity";


@Entity()
export class TenantPermission{
    @PrimaryGeneratedColumn()
    id:number

   
   
  

    @Column({})
    route:string

    @Column({name:'sub_route'})
    subRoute:string

    @Column({type:"integer"})
 actionsId:number

    @ManyToOne(()=>UserActionMaster,action=>action.permissions)
    actions :UserActionMaster

  @ManyToOne(()=>ProductMaster,product=>product.permission)
  @JoinColumn({name:'product_id'})
  products :ProductMaster
    
    @OneToMany(()=>TenantRoles,TenantRoles=>TenantRoles.permissions)
  tenantRoles:TenantRoles[]

}