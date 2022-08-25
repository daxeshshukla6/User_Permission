import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import console from 'console';
import { createActionDto } from 'src/global/action/action.dto';
import { assignedPermissionDto } from 'src/global/permission/permission.dto';
import { createRoleDto } from './roleDto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService:RolesService){}

    @GrpcMethod('RoleManagement','CreateRole')
    async CreateRole(@Body() createRoleDto:createRoleDto){
        const res= await this.roleService.createRoleDetail(createRoleDto)
        return res
    }
@GrpcMethod('RoleManagement','GetRole')
async GetRole(){
   return await this.roleService.getroles();

//    return re
}
@GrpcMethod('RoleManagement','GetRoleById')
async GetRoleById(id){
return await this.roleService.getrole(id);

}

@GrpcMethod('RoleManagement','UpdateRole')
async UpdateRole(@Body() CreateRoleDto:createRoleDto){
   return   await this.roleService.updateRole(CreateRoleDto);
    
}
@GrpcMethod('RoleManagement','AssignPermission')
async AssignPermission(@Body() assignPermissionDto:assignedPermissionDto){
return await this.roleService.assignPermission(assignPermissionDto)
}
}
 




