import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createPermissionDto } from 'src/dtos/permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionRestController {
  constructor(private readonly permisisonService:PermissionService)  {}

@Get('get')
async GetGlobalPermission(@Query("id")id:number){
const a= await this.permisisonService.getPermission(id)
return a
}
@Post('create')
async CreatePermission(@Body() ceratePermission:createPermissionDto){
const res=await this.permisisonService.createPermission(ceratePermission)
console.log(res)
return res
}
}
