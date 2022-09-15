import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionMaster } from "./permission.entity";
import { TenantPermission } from "./tenant_permission.entity";
import { TenantRolesDetailed } from "./tenant_roles_detailed.entity";

import { UserRole } from "./user_role.entity";

@Entity()
export class TenantRoles{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'integer',name:'tenant_id'})
    tenantId:number

    
    
    @Column()
    tenantRoleDetailsId:number

    @Column()
    permissionsId:number


     @ManyToOne(()=>TenantRolesDetailed,TenantroleDetail=>TenantroleDetail.tenantRoles)
    tenantRoleDetails:TenantRolesDetailed
 
    @ManyToOne(()=>TenantPermission,permission=>permission.tenantRoles)
    permissions:TenantPermission

   
}