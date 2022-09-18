import { Controller, Get, Query } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionRestController {
  constructor(private readonly permisisonService:PermissionService)  {}

@Get('get')
async GetGlobalPermission(@Query("id")id:number){
const a= await this.permisisonService.getPermission(id)
return a
}
}
