import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionMaster } from "./permission.entity";
import { RoleDetailedMaster } from "./role_detailed_master.entity";
import { TenantMasterRole } from "./tenant_master_role.entity";

import { UserRole } from "./user_role.entity";

@Entity()
export class RoleMaster{
  @PrimaryGeneratedColumn()
  id: number;

   @Column({name:'role_details_id'})
   roleDetailsId:number;

   @Column({name:'permission_id'})
   permissionId:number;

  @ManyToOne(()=>RoleDetailedMaster,roleDetail=>roleDetail.roles)
  @JoinColumn({name:'role_details_id'})
  roleDetails:RoleDetailedMaster
  
  @ManyToOne(()=>PermissionMaster,permission=>permission.roles)
  @JoinColumn({name:'permission_id'})
  permissions:PermissionMaster

  // @OneToMany(()=>TenantMasterRole,TenantRole=>TenantRole.roles)
  // tenantRoles:TenantMasterRole
 
}
