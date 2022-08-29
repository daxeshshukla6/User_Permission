import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserActionMaster } from "./action.entity";
import { FieldMaster } from "./field_master.entity";
import { ProductMaster } from "./product.entity";
import { RoleMaster } from "./role_master.entity";
import { TenantRoles } from "./tenant_roles.entity";


@Entity()
export class PermissionMaster{
@PrimaryGeneratedColumn()
id:number

@Column({type:'varchar'})
route:string

@Column({name:'sub_route'})
subRoute:string


// @Column()
// productsId:string

// @Column()
// actionsId:string

// @Column()
// fieldsId:string

 @ManyToOne(()=>ProductMaster,product=>product.permission)
 @JoinColumn({name:'product_id'})
 products :ProductMaster

 @ManyToOne(()=>UserActionMaster,action=>action.permissions)
 @JoinColumn({name:'action_id'})
  actions :UserActionMaster

  @ManyToOne(()=>FieldMaster,field=>field.permissions)
  @JoinColumn({name:'field_id'})
  fields:FieldMaster
  
  @OneToMany(()=>RoleMaster,role=>role.permissions)
  roles:RoleMaster[]

  // @OneToMany(()=>TenantRoles,TenantRoles=>TenantRoles.permissions)
  // tenantRoles:TenantRoles[]
  
  
}
