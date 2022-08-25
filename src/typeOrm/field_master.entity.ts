import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PermissionMaster } from "./permission.entity";

@Entity()
export class FieldMaster{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar", nullable:true,name:'field_name'})
    fieldName:String
    
    @Column({type:"varchar", nullable:true,name:'field_desc'})
    fieldDesc:String
    
    @Column({type:"varchar", nullable:true,name:'entry_by'})
    entryBy:String
    
    @Column({type:"date",name:'entry_date'})
    entryDate:Date
    
    @Column({type:"varchar", nullable:true,name:'last_update_by'})
    lastUpdatedBy:String
    
    @Column({type:"date",name:'last_updated_date'})
    lastUpdatedDate:Date

   @OneToMany(()=>PermissionMaster,permission=>permission.fields)
  permissions:PermissionMaster[]
}