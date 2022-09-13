import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { assignedPermissionDto, Permission } from 'src/dtos/permission.dto';
import { UserActionMaster } from '../typeOrm/action.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { DataSource, Repository,QueryRunner } from 'typeorm';
import { createRoleDto } from '../dtos/role.dto';
import * as path  from 'path';


import * as excelReader from 'xlsx'

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
    try{
     const newRole = this.tenantRoleDetailedRepository.create(createRoleDto);
     
     return this.tenantRoleDetailedRepository.save(newRole);
     

    }catch(e){
        throw new RpcException({message:e.message,status:e.status})
        
    }
}

 //This function gets the all roles with details 
async getroles(){
    const res = await this.tenantRoleDetailedRepository.find()
   if(!res) throw new RpcException('Roles Not Found')
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
   
const res= await this.tenantRoleDetailedRepository.findOneBy(id)
if(!res) throw new RpcException('Role not Found')
return res
}


    

async getRoleDetails(roleid:number){
    const role_details = await this.tenantDataSource.getRepository(TenantRoles).createQueryBuilder('tenantRole')
    
    .leftJoin('tenantRole.tenantRoleDetails','tenantRolesDetailed')
    .addSelect(['tenantRolesDetailed.roleName','tenantRolesDetailed.roleDesc'])
    .where({id:roleid})
    .getMany()
    return role_details[0].tenantRoleDetails
}

async createPermission(createPermissionDto){
    const newPermission = await this.tenantPermissionRepo.create(createPermissionDto);
    //await this.getPermission('create','master','domain master')
     return this.tenantPermissionRepo.save(newPermission);
}

//bulk upload
async excelFileReader2(){
    const filePath = path.resolve(__dirname, '../../template/Role.xlsx')
    console.log(filePath)
    const file = excelReader.readFile(filePath)
    // const sheets = file.SheetNames
    let roles = [];
    let user = [];
    roles = excelReader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
    user = excelReader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]])
    const data = {
        roles:roles,
        users:user
    }
    return data;
}
async timepass ():Promise<any>{
   const a = await this.excelFileReader2()
   console.log(a)
         }
}


