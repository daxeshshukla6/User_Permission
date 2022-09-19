import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserActionMaster } from '../typeOrm/action.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { DataSource, Repository } from 'typeorm';
import { assignedPermissionDto, Permission, Role } from '../dtos/permission.dto';
import { checks } from 'src/roles/checks';

@Injectable()
export class TenantPermissionService {
    constructor(
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
        @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
        @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
        @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>,
        @InjectDataSource('tenant_role_management') private tenantDataSource: DataSource,
        @Inject(forwardRef(() => checks))
        private check:checks
    ) { } 


    async assignPermission(request:Permission){

    
        request.permissions.forEach(async(x)=>{
          
           x.actions.forEach(async(y)=>{
               
               const permission = new assignedPermissionDto()
               permission.tenantRoleDetailsId=request.tenantRoleDetailsId
               permission.tenantId=request.tenantId
               permission.permissionsId= await this.getPermission(y.action,x.subModule,x.module)
               if(y.value===true){
                
               
                if(await this.check.ispermissionexists(permission.tenantRoleDetailsId,x.module,x.subModule,y.action)===false)
                await this.tenantRoleRepository.save(permission)
                
                
                
               
            }
            else{
                await this.tenantRoleRepository.delete(permission)
            }
               
        
        
       })
       })
       
       return 'permission assigned successfully'
       }
//Find the Particular Permission From the Permission Table 
async getPermission(action:string,subroutes:string,routes:string){
    try{
     const permission= await this.permissionRepo.find({
         select:{
             id:true
         },
    where:[{
     actionsId:await this.getAction(action),
     subRoute:subroutes,
     route:routes,
      }]
  })
 
 
  return permission[0].id
    }
 catch(e){
     console.log(e)
     throw new RpcException({message:e.message,status:e.status})
 
 }
 }
 
 async getAction(actions:string){
    const action_id= await this.actionRepository.find({
        select:{
            id:true
        },
        where:{
            actionName:actions
        }
    })
    
    return action_id[0].id
    
 }
async getAssignPermission(Roleid:number){
let assignedPermission={}
const modules=await this.tenantRoleRepository.find({
    relations:{
        permissions:true
    },
    where:{
        id:Roleid
    }
    
})

console.log(modules[0].permissions)
}

async timepass ():Promise<any>{
  const a=await this.getAssignPermission(55)
 //console.log(a)
}
async getPermissions(productid:number){
    const modules=await this.permissionRepo.find({
        select:{
            route:true,
            subRoute:true,
            actions:{
                actionName:true
            }
        },relations:{
            actions:true
        },
        where:{
            products:{
                id:productid
            }
        }
    })
    
    //console.log(modules)
    const output1 = [];
modules.forEach((x)=>{
const y = {
  module:x.route,
  subModule:x.subRoute,
  actions:[
    {
      action:x.actions.actionName,
      value:true
    }
  ]
}
output1.push(y)
})



var output2 = [];

output1.forEach(function(item) {
var existing = output2.filter(function(v, i) {
  return v.module == item.module && v.subModule == item.subModule;
});
if (existing.length) {
  var existingIndex = output2.indexOf(existing[0]);
  output2[existingIndex].actions = output2[existingIndex].actions.concat(item.actions);
} else{
  output2.push(item)
}
});


  console.log(output2)  
  return {permissions:output2}
}
}
