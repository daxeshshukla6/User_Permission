import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
    } from '@nestjs/common';
    
    import { UsersService } from 'src/users/Users.service';
import { assignroletouser, createUserDto, roleToUser } from 'src/dtos/users.dto';
import { GrpcMethod } from '@nestjs/microservices';
    
    @Controller('users')
    export class UsersRestController {
      constructor(private readonly userService: UsersService) {}
      
    @Get('get') 
    async GetUser() {
      return await this.userService.getUsers();
      }

      @Post('assignRole')
      async  AssignedRoleToUser(@Body() Roles:roleToUser){
        const res = await this.userService.assignRole(Roles)
        return {message:res}
      }
    @Post('create')
      createUser(@Body() createUserDto: createUserDto) {
        return this.userService.createUser(createUserDto);
      }
    @Get('gets')
 async GetUserById(@Query("id")id:number){
        const res= await this.userService.getuserbyid(id)
        console.log(res)
        return res
      }
     @Put('update')
      async UpdateUser(@Body() createUserDto:createUserDto){
       return await this.userService.updateUser(createUserDto)
      }
    }