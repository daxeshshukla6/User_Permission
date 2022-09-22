import { Body, Injectable } from '@nestjs/common';
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

import { checks } from './checks';
import * as excelReader from 'xlsx'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeOrm';

@Injectable()
export class RolesService { 
    constructor(
    @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
    @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
    @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
    @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
    @InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>,
    @InjectRepository(User,'tenant_role_management') private readonly userRepo:Repository<User>,
    @InjectDataSource('tenant_role_management') private tenantDataSource: DataSource,
    private jwtservice:JwtService,
    private check:checks
) { } 
//This function is for create role detail 
 async createRoleDetail(createRoleDto: createRoleDto) {
    const roleExist= await this.check.isRoleNameExists(createRoleDto.roleName,createRoleDto.tenantId)
    try{
        if(roleExist===false){
     const newRole = this.tenantRoleDetailedRepository.create(createRoleDto);
     //console.log(newRole)
        
     return this.tenantRoleDetailedRepository.save(newRole);
    }
    else{
        return 'Role Name Already exists'
        
    }

    }catch(e){
        throw new RpcException({message:e.message,status:e.status})
        
    }
}

 //This function gets the all roles with details 
async getroles(tenantid:number){
    //console.log(tenantid)
    const res = await this.tenantRoleDetailedRepository.find({
        where:{
            
                tenantId:tenantid
            
        }
    })
   if(!res) throw new RpcException('Roles Not Found')
   const x=await this.status('Role',5,false)
   console.log(x)
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
async getrole(roleid:number){
   
const res= await this.getRoleDetails(roleid)
// console.log(res)

const resp= await this.getPermission(roleid)
// console.log(resp)
const result={
    ...res,
    ...resp
}

if(!resp) throw new RpcException('Role not Found')
return result
}
//Permission
async getPermission(roleid:number){
    const permissions=await this.permissionRepo.find({
        select:{
             route:true,
            subRoute:true,
            actions:{
                actionName:true
            }
            
        },
         relations:{
             actions:true
             },
        where:{
            tenantRoles:{
                tenantRoleDetails:{
                    id:roleid
                }
            }
            
        }
    })
  
    const output1 = [];
permissions.forEach((x)=>{
const y = {
    
 module:x.route,
 subModule:x.subRoute,
 actions:[
    {
    action:x.actions.actionName,
    value:true
}]

}
//console.log(y)
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
//console.log(JSON.stringify(output2[0]))  
 return {permissions:output2}
}

    

async getRoleDetails(roleid:number){
    const role_details = await this.tenantRoleDetailedRepository.find({
        where:{
            
                id:roleid
            
        }
    })
    const res= await this.timepass()
    console.log(res)
    return role_details[0]
    
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

    //const dx=await this.check.ispermissionexists(10,'master','product','create')
    //console.log(dx)
    const payload ={tenantId:10}
    return {
        access_token:await this.jwtservice.sign(payload)
    }
    

         }
async status(type:string,id:number,status:boolean){
if(type==='role' || type==='Role'){
    const res= await this.tenantRoleDetailedRepository.update(id,{roleStatus:status})
    if(res) console.log('Role status has been deactivated')
}
else{
    const res=await this.userRepo.update(id,{userStatus:status})
    if(res)console.log('User Has been deActivated')
}
}
}


