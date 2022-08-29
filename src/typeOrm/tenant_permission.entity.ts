import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMaster } from "./role_master.entity";
import { TenantRoles } from "./tenant_roles.entity";


@Entity()
export class TenantPermission{
    @PrimaryGeneratedColumn()
    id:number

    // @Column({name:'permission_id'})
    // permissionId:number

   
    @Column({name:'product_name'})
    product:string

    @Column({})
    route:string

    @Column({name:'sub_route'})
    subRoute:string

    @Column({name:'action_name'})
    action:string
    
//     @OneToMany(()=>TenantRoles,TenantRoles=>TenantRoles.permissions)
//   tenantRoles:TenantRoles[]

}