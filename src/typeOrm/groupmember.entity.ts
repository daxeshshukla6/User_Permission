import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserGroup } from "./usergroup.entity";


@Entity()
export class GroupMember{
    @PrimaryColumn()
      id:number;
   
      @ManyToOne(()=>User,user=>user.members)
      @JoinColumn({name:'user_id'})
      users:User
      
      @ManyToOne(()=>UserGroup,group=>group.members)
      @JoinColumn({name:'group_id'})
      groups:UserGroup
}