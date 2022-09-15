import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TenantRoles } from "./tenant_roles.entity";
import { TenantRolesDetailed } from "./tenant_roles_detailed.entity";

import { User } from "./user.entity";
import { UserGroup } from "./usergroup.entity";

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id:number
   @Column()
   user_id:number
   @Column()
   tenant_role_id:number
   @Column({nullable:true})
   group_id:number

   @ManyToOne(()=> User, user=>user.userRoles)
   @JoinColumn({name:'user_id'})
   user : User

  @ManyToOne(()=> UserGroup, userGroup=>userGroup.userRoles)
  @JoinColumn({name:'group_id'})
  userGroup : User
  
   @ManyToOne(()=> TenantRolesDetailed, tenantRoles=>tenantRoles.userRoles)
   @JoinColumn({name:'tenant_role_id'})
  tenantRoles : TenantRolesDetailed
 
}
