

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupMember } from "./groupmember.entity";
import { UserRole } from "./user_role.entity";


@Entity()
export class UserGroup{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar", nullable:true,name:'group_name'})
    groupName:String
    
    
    
    @Column({type:"varchar", nullable:true,name:'group_desc'})
    groupDesc:String
    
    @Column({type:"varchar", nullable:true,name:'entry_by'})
    entryBy:String
    
    @Column({type:"date",name:'entry_date'})
    entryDate:Date
    
    @Column({type:"varchar", nullable:true,name:'last_updated_by'})
    lastUpdatedBy:String
    
    @Column({type:"date",name:'last_updated_date'})
    lastUpdatedDate:Date

    @OneToMany(() => GroupMember, member => member.groups)
members : GroupMember[];

@OneToMany(() => UserRole, userRole => userRole.userGroup)
userRoles : GroupMember[];


}