import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
// import console, { Console } from 'console';
import { createActionDto } from 'src/global/action/action.dto';
import { assignedPermissionDto, createPermissionDto, Permission } from 'src/global/permission/permission.dto';
// import { assignedPermissionDto, createPermissionDto } from 'src/global/permission/permission.dto';
import { createRoleDto } from './roleDto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService:RolesService){}
//Create Role Details 
    @GrpcMethod('RoleManagement','CreateRole')
    async CreateRole(@Body() createRoleDto:createRoleDto){
        const res= await this.roleService.createRoleDetail(createRoleDto)
        return res
    }
//Retrive All roles details  
@GrpcMethod('RoleManagement','GetRole')
async GetRole(){
   return await this.roleService.getroles();

//    return re
}
//Retrive Particular role by id 
@GrpcMethod('RoleManagement','GetRoleById')
async GetRoleById(id){
return await this.roleService.getrole(id);

}
//Update Role Details 
@GrpcMethod('RoleManagement','UpdateRole')
async UpdateRole(@Body() CreateRoleDto:createRoleDto){
   return   await this.roleService.updateRole(CreateRoleDto);
    
}
//Create Permission Temp function
@GrpcMethod('RoleManagement','CreatePermission')
async CreatePermission(@Body() createPermissionDto:createPermissionDto){
    const res=await this.roleService.createPermission(createPermissionDto);
    return res
}

//Assign Permission to Role 
@GrpcMethod('RoleManagement','AssignPermission')
async AssignPermission(@Body() Permission:Permission){
const res = await this.roleService.assignPermission(Permission)
return {message:res}
}
}
 




