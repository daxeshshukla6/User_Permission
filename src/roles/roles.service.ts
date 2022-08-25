import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
import { parse } from 'path';
import { createActionDto } from 'src/global/action/action.dto';
import { assignedPermissionDto } from 'src/global/permission/permission.dto';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { RoleDetailedMaster } from 'src/typeOrm/role_detailed_master.entity';
import { RoleMaster } from 'src/typeOrm/role_master.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
//import { role_master } from 'src/typeOrm/role_master.entity';
import { UserRole } from 'src/typeOrm/user_role.entity';
//import { CreateUserDto } from 'src/users/userDto/users.dto';
import { Repository } from 'typeorm';
import { createRoleDto } from './roleDto/role.dto';


@Injectable()
export class RolesService { 
    constructor(
    // @InjectRepository(RoleDetailedMaster,'global_role_management') private readonly roleDeatailRepository: Repository<RoleDetailedMaster>,
    //  @InjectRepository(UserRole) private readonly mapRepository: Repository<UserRole>,
    // @InjectRepository(ProductMaster,'global_role_management') private readonly productRepository: Repository<ProductMaster>,
    // @InjectRepository(RoleMaster,'global_role_management') private readonly RoleRepository: Repository<RoleMaster>
    @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
    @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>
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

async assignPermission(assignPermissionDto:assignedPermissionDto){

    const assignPermissions =await this.tenantRoleDetailedRepository.create(assignPermissionDto);
    console.log(assignPermissions)
    const res= this.tenantRoleDetailedRepository.save(assignPermissions);
    
    return res
}

//Find the Particular Permission From the Permission Table 
async getPermission(action:number,){

}

}

