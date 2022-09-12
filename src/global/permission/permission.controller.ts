import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permisisonService:PermissionService)  {}

@GrpcMethod('RoleManagement','GetGlobalPermission')
async GetGlobalPermission(body:{id:number}){
const a= await this.permisisonService.getPermission(body.id)
return a
}
}
