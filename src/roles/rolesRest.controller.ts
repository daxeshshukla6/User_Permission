import { Body, Controller, Get, Post, Put, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
// import console, { Console } from 'console';
import { createActionDto } from 'src/dtos/action.dto';
import { assignedPermissionDto, createPermissionDto, Permission } from 'src/dtos/permission.dto';
import { PermissionService } from 'src/global/permission/permission.service';
import { TenantPermissionService } from 'src/tenantpermission/tenantpermission.service';
// import { assignedPermissionDto, createPermissionDto } from 'src/global/permission/permission.dto';
import { createRoleDto } from '../dtos/role.dto';
import { RolesService } from './roles.service';
import { TenantId } from './roles.decorator';

@Controller('roles')
export class RolesRestController {
    constructor(private readonly roleService:RolesService,private readonly permissionService:PermissionService,private readonly tenantpermissionService:TenantPermissionService )
    {}
//Create Role Details   
    @Post('create')
    async CreateRole(@Body() createRoleDto:createRoleDto){
        const res= await this.roleService.createRoleDetail(createRoleDto)
        return res
    }
//Retrive All roles details  
@Get('getAll')
async GetRole(@TenantId() tenantId){
    // const headers = req.headers
   return await this.roleService.getroles(tenantId);

//    return re
}
//Retrive Particular role by id 
@Get('get')
async GetRoleById(@Query("id")id:number){
const a= await this.roleService.getrole(id);
//console.log(a)
return a    
}
//Update Role Details 
@Put('updateRole')
async UpdateRole(@Body() CreateRoleDto:createRoleDto){
   return   await this.roleService.updateRole(CreateRoleDto);
    
}



//Assign Permission to Role 
@Post('assignPermission')
async AssignPermission(@Body() Permission:Permission){
    //throw new RpcException({message:'error message'})
   try{
    const res = await this.tenantpermissionService.assignPermission(Permission)
return {message:res}
   }catch(e){
    throw new RpcException({message:e.message,status:e.status})
   }
}

@GrpcMethod('RoleManagement', 'Timepass')
async timepass ():Promise<any> {
    await this.roleService.timepass()
}

 }
 




