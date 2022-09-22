import { forwardRef, Inject } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { TenantPermissionService } from "src/tenantpermission/tenantpermission.service";
import { UserActionMaster } from "src/typeOrm/action.entity";
import { TenantPermission } from "src/typeOrm/tenant_permission.entity";
import { TenantRoles } from "src/typeOrm/tenant_roles.entity";
import { TenantRolesDetailed } from "src/typeOrm/tenant_roles_detailed.entity";
import { DataSource, Repository } from "typeorm";

export class checks{
    constructor(
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
        //@InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
        @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
        @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
        //@InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>,
        //@InjectDataSource('tenant_role_management') private tenantDataSource: DataSource,
        @Inject(forwardRef(() => TenantPermissionService))
        private tenantPermission:TenantPermissionService
        
    ) { }   
    //check permission exists or not 
async ispermissionexists(roleId:number,routes:string,subroutes:string,actions:string){
    const permission= await this.tenantRoleRepository.find({
        select:{
            permissions:{
                id:true
            }
        },
   where:[{
    permissions:{
    actionsId:await this.tenantPermission.getAction(actions),
    subRoute:subroutes,
    route:routes,
    },
    
        tenantRoleDetailsId:roleId
    
     }]
 })
    if(permission.length===0)
    return  false
    else
    return true

// const output1 = [];
//  resp.forEach((x)=>{
//  const y = {
    
 
 
//      permissionId:x.permissionsId,
    


//  }
// // console.log(y)
//   output1.push(y)
//  })
//  var output2 = [];

//  output1.forEach(function(item) {
//  var existing = output2.filter(function(v, i) {
//    return v.permissionsId == item.permissionId;
//   });
//  if (existing.length) {
//    var existingIndex = output2.indexOf(existing[0]);
//    output2[existingIndex].tenantRoles = output2[existingIndex].tenantRoles.concat(item.tenantRoles);
//  } else{
//    output2.push(item)
//  }
// });
// //  console.log(JSON.stringify(output2)) 
//  const x = {
//     permissionId:output2.map((x)=>x.permissionId)
//  } 
//  console.log(x)
//  return x
 }
 //check if roleName exists or not 
async isRoleNameExists(rolename:string,tenantid:number){
const res= await this.tenantRoleDetailedRepository.find({
    select:{
       roleName:true 
    },
    where:{
        roleName:rolename 
        
    }
})

if(res.length===0){
    return false 
}
else{
    return true 
}

}
}
