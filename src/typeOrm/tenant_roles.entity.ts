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
    is_true:boolean

     
    
    @ManyToOne(()=>TenantRolesDetailed,TenantroleDetail=>TenantroleDetail.tenantRoles)
    @JoinColumn({name:'tenant_role_detail_id'})
    tenantRoleDetails:TenantRolesDetailed
    
    @ManyToOne(()=>TenantPermission,permission=>permission.tenantRoles)
    @JoinColumn({name:'permission_id'})
    permissions:TenantPermission

    @OneToMany(()=>UserRole,userRole=>userRole.tenantRoles)
    userRoles:UserRole[]
}