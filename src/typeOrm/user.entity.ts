//import { group } from 'console';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMember } from './groupmember.entity';

import { UserRole } from './user_role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar',name:'user_name'})
  userName:string

  @Column({type:'varchar',name:'first_name'})
  firstName:string

  @Column({type:'varchar',name:'last_name'})
  lastName:string

  @Column({type:'varchar'})
  email: string;

  
  

  
@OneToMany(() => UserRole, userRole => userRole.user)
 userRoles : UserRole[];  

 @OneToMany(() => GroupMember, group => group.users)
 members: GroupMember[];
   
}
