import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { DataSource, Repository } from 'typeorm';
import { assignedPermissionDto, Permission } from '../../dtos/permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
        @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
        @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
        @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>,
        @InjectDataSource('tenant_role_management') private tenantDataSource: DataSource,
    ) { } 


    async assignPermission(request:Permission){
    
        request.permissions.forEach(async(x)=>{
          
           x.actions.forEach(async(y)=>{
               
               const permission = new assignedPermissionDto()
               permission.tenantRoleDetailsId=request.tenantRoleDetailsId
               permission.tenantId=request.tenantId
               permission.permissionsId= await this.getPermission(y.action,x.subModule,x.module)
               if(y.value===true){
                const z = await this.tenantRoleRepository.save(permission)
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
async getAssignPermission(){

}
async getActionName(route:string,subRoute:string){
    const actionName= await this.permissionRepo.find({
        
        relations:{
            actions:true
        },
        where:{
            route:route,
            subRoute:subRoute
        }
        
    })
//     const actionName= await this.tenantDataSource.getRepository(TenantPermission).createQueryBuilder('t1')
//     .leftJoin('t1.permissions','TenantPermission')
//    .select('t2.actionName','t2_actionName')
//     .innerJoin(UserActionMaster,'t2','t1.actionsId=t2.id')
    //  .innerJoin(UserActionMaster,'t3','t2.actionsId=t3.id')
//     .getOne()
for  ( const i in actionName){
        const a=actionName[i].actions.actionName
        
    console.log(a)
}
}
async timepass ():Promise<any>{
  // const a=await this.getActionName()
}

}
