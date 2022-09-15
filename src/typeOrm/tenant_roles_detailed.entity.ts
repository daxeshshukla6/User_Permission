import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TenantRoles } from "./tenant_roles.entity";
import { UserRole } from "./user_role.entity";


@Entity()
export class TenantRolesDetailed{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',name:'role_name'})
    roleName:string
    
    @Column({type:'varchar',name:'role_desc'})
    roleDesc:string
    
    @Column({type:'boolean',name:'role_status'})
    roleStatus:boolean

    @Column({type:'boolean',name:'is_global'})
    isGlobal:boolean

    @OneToMany(()=>TenantRoles,TenantRole=>TenantRole.tenantRoleDetails)
    tenantRoles:TenantRoles[]

    @OneToMany(()=>UserRole,userRole=>userRole.tenantRoles)
    userRoles:UserRole[]
}