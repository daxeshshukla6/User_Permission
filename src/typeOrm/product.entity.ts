import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PermissionMaster } from "./permission.entity";
import { TenantPermission } from "./tenant_permission.entity";

@Entity()
export class ProductMaster{
@PrimaryGeneratedColumn()
id:number

@Column({type:"varchar", nullable:true,name:'product_name'})
productName:string

@Column({type:"varchar", nullable:true,name:'product_code'})
productCode:string

@Column({type:"varchar", nullable:true,name:'product_desc'})
productDesc:string

@Column({type:"varchar", nullable:true,name:'entry_by'})
entryBy:string

@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" ,name:'entry_date'})
    public entryDate: Date;

@Column({type:"varchar", nullable:true,name:'last_updated_by'})
lastUpdatedBy:string

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)",name:'last_updated_date' })
    public lastUpdatedDate: Date;

// @Column({nullable:true})
// parentId:string

@OneToMany(()=>TenantPermission,permission=>permission.products)
 permission:TenantPermission[]

 @ManyToOne((type) => ProductMaster, (product) => product.children)
 @JoinColumn({name:'parent_id'})
 parent: ProductMaster

 @OneToMany((type) => ProductMaster, (product) => product.parent)
 children: ProductMaster[]
}

