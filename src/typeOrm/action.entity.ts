import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PermissionMaster } from "./permission.entity";


@Entity()
export class UserActionMaster{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({ type:'varchar', nullable:true ,name:'action_name'})
    actionName:string
  
   

  @Column({type:'varchar', nullable:true,name:'entry_by'})
   entryBy:string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",name:'entry_date' })
    public entryDate: Date;
  
  @Column({type:'varchar',nullable:true,name:'last_updated_by'})
   lastUpdatedBy:string

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" ,name:'last_updated_date'})
    public lastUpdatedDate: Date;
  
  @OneToMany(()=>PermissionMaster,permission=>permission.actions)
    permissions:PermissionMaster[]
  
  
 
}
