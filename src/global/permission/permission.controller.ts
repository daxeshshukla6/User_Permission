import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createPermissionDto } from 'src/dtos/permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permisisonService:PermissionService)  {}

@GrpcMethod('globalRoleManagement','GetGlobalPermission')
async GetGlobalPermission(body:{id:number}){
const a= await this.permisisonService.getPermission(body.id)
return a
}
@GrpcMethod('RoleManagement','CreatePermission')
async CreatePermission(@Body() createPermissionDto:createPermissionDto){
    const res=await this.permisisonService.createPermission(createPermissionDto);
    return res
}
}
