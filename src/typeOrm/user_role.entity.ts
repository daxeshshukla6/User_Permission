import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TenantRoles } from "./tenant_roles.entity";

import { User } from "./user.entity";
import { UserGroup } from "./usergroup.entity";

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id:number
   @Column()
   userId:string
   @ManyToOne(()=> User, user=>user.userRoles)
  user : User
  @ManyToOne(()=> UserGroup, userGroup=>userGroup.userRoles)
  @JoinColumn({name:'group_id'})
  userGroup : User
   @ManyToOne(()=> TenantRoles, tenantRole=>tenantRole.userRoles)
   @JoinColumn({name:'tenant_role_id'})
  tenantRoles : TenantRoles
 
}
