import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { assignedPermissionDto, Permission } from 'src/dtos/permission.dto';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { DataSource, Repository,QueryRunner } from 'typeorm';
import { createRoleDto } from '../dtos/role.dto';

@Injectable()
export class RolesService { 
    constructor(
    @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
    @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
    @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
    @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
    @InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>,
    @InjectDataSource('tenant_role_management') private tenantDataSource: DataSource,
) { } 
//This function is for create role detail 
 createRoleDetail(createRoleDto: createRoleDto) {
     const newRole = this.tenantRoleDetailedRepository.create(createRoleDto);
     
     return this.tenantRoleDetailedRepository.save(newRole);

 }

 //This function gets the all roles with details 
async getroles(){
    const res = await this.tenantRoleDetailedRepository.find()
   // await this.getAction('view')
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


    
//Find Role_id by the role name 
async getRoleId(role_name:string,role_desc:string,){

}
async getRoleDetails(roleid:number){
    const role_details = await this.tenantDataSource.getRepository(TenantRoles).createQueryBuilder('tenantRole')
    
    .leftJoin('tenantRole.tenantRoleDetails','tenantRolesDetailed')
    .addSelect(['tenantRolesDetailed.roleName','tenantRolesDetailed.roleDesc'])
    .where({id:roleid})
    .getMany()
    return role_details[0].tenantRoleDetails
}
 //get role with permission
// async getRolePermisison(id){
// const twoJoin=await this.tenantDataSource.getRepository(Action).createQueryBuilder("action").leftJoin(Permission,"permission","permission.actionId=action.id").

// }

async createPermission(createPermissionDto){
    const newPermission = await this.tenantPermissionRepo.create(createPermissionDto);
    //await this.getPermission('create','master','domain master')
     return this.tenantPermissionRepo.save(newPermission);
}
async timepass ():Promise<any>{
    const role_details =await this.getRoleDetails(1)
    console.log(role_details)
    }
}


