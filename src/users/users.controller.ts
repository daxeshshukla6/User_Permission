import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe,
    } from '@nestjs/common';
    
    import { UsersService } from 'src/users/Users.service';
import { assignroletouser, createUserDto, roleToUser } from 'src/dtos/users.dto';
import { GrpcMethod } from '@nestjs/microservices';
    
    @Controller('users')
    export class UsersController {
      constructor(private readonly userService: UsersService) {}
      
     @GrpcMethod('RoleManagement','GetUser') 
    async GetUser() {
      return await this.userService.getUsers();
      }

      @GrpcMethod('RoleManagement','AssignedRoleToUser')
      async  AssignedRoleToUser(@Body() Roles:roleToUser){
        const res = await this.userService.assignRole(Roles)
        return {message:res}
      }
     @GrpcMethod('RoleManagement','CreateUser')
      createUser(@Body() createUserDto: createUserDto) {
        return this.userService.createUser(createUserDto);
      }
      @GrpcMethod('RoleManagement','GetUserById')
 async GetUserById(id){
        const res= await this.userService.getuserbyid(id)
        return res
      }
      @GrpcMethod('RoleManagement','UpdateUser')
      async UpdateUser(@Body() createUserDto:createUserDto){
       return await this.userService.updateUser(createUserDto)
      }
    }