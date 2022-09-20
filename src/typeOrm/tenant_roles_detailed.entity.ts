import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TenantRoles } from "./tenant_roles.entity";
import { UserRole } from "./user_role.entity";


@Entity()
export class TenantRolesDetailed{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',name:'role_name' ,nullable:true})
    roleName:string
    
    @Column({type:'varchar',name:'role_desc',nullable:true})
    roleDesc:string
    
    @Column({type:'boolean',name:'role_status',nullable:true})
    roleStatus:boolean

    @Column({type:'boolean',name:'is_global',nullable:true})
    isGlobal:boolean

    @Column({type:'integer',name:'tenant_id',nullable:true})
    tenantId:number

    @Column({type:'integer',nullable:true,name:'current_users'})
    currentUsers:number

    @OneToMany(()=>TenantRoles,TenantRole=>TenantRole.tenantRoleDetails)
    tenantRoles:TenantRoles[]

    @OneToMany(()=>UserRole,userRole=>userRole.tenantRoles)
    userRoles:UserRole[]
}