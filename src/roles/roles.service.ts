import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createActionDto } from 'src/global/action/action.dto';
import { assignedPermissionDto, Permission } from 'src/global/permission/permission.dto';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { PermissionMaster } from 'src/typeOrm/permission.entity';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { RoleDetailedMaster } from 'src/typeOrm/role_detailed_master.entity';
import { RoleMaster } from 'src/typeOrm/role_master.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
// import { role_master } from 'src/typeOrm/role_master.entity';
import { UserRole } from 'src/typeOrm/user_role.entity';
//import { CreateUserDto } from 'src/users/userDto/users.dto';
import { DataSource, Repository } from 'typeorm';
import { createRoleDto } from './roleDto/role.dto';


@Injectable()
export class RolesService { 
    constructor(
    // @InjectRepository(RoleDetailedMaster,'global_role_management') private readonly roleDeatailRepository: Repository<RoleDetailedMaster>,
    //  @InjectRepository(UserRole) private readonly mapRepository: Repository<UserRole>,
    @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
    @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
    @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
    @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
    @InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>
) { } 
//This function is for create role detail 
 createRoleDetail(createRoleDto: createRoleDto) {
     const newRole = this.tenantRoleDetailedRepository.create(createRoleDto);
     
     return this.tenantRoleDetailedRepository.save(newRole);

 }

 //This function gets the all roles with details 
async getroles(){
    const res = await this.tenantRoleDetailedRepository.find()
   return {
    GetRole:res
   }
}
//This function is for update role details 
async updateRole(createRoleDto:createRoleDto){
        
    const res= await this.tenantRoleDetailedRepository.update(createRoleDto.id,createRoleDto)
    
    return await this.tenantRoleDetailedRepository.findOneBy(createRoleDto)
}

//this function gets the role details by its id 
async getrole(id){
   
return await this.tenantRoleDetailedRepository.findOneBy(id)
}
// async getProduct(){
//     return await this..find()
// }

//Function to assign Permission to role 
async assignPermission(request:Permission){

 request.permissions.forEach(async(x)=>{
    x.actions.forEach(async(y)=>{
        const permission = new assignedPermissionDto()
        permission.roleName=request.roleName
        permission.isTrue=y.value
        permission.permissionId= await this.getPermission(y.action,x.module,x.subModule)
        const z = await this.tenantRoleRepository.save(permission)
        console.log(z)
    })

 })
 
return 'permission assigned successfully'

}

    


//Find the Particular Permission From the Permission Table 
async getPermission(action:string,routes:string,subroutes:string){
    const permission= await this.permissionRepo.find({
        select:{
            id:true
        },
   where:[{
    action:action,
    route:routes,
    subRoute:subroutes
   }]

 })
 
 return permission[0].id
}
async createPermission(createPermissionDto){
    const newPermission = await this.tenantPermissionRepo.create(createPermissionDto);
    //await this.getPermission('create','master','domain master')
     return this.tenantPermissionRepo.save(newPermission);
}

//Check If any permission assign to a role 
// async is_permission_assigned(role_id){
//     const permission=await this.tenantRoleRepository.find({
//         where:[{
            
//         }]
//     })
// }
}

