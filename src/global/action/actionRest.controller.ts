import { Body, Controller, Get, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RolesService } from 'src/roles/roles.service';
import { createActionDto } from '../../dtos/action.dto';
import { ActionService } from './action.service';

@Controller('action')
export class ActionControllerRest{
constructor(private readonly actionService:ActionService) {}

    @Get('get')
    async GetAction(){
     const res = await this.actionService.getActions()
     
     return res
}

    @Post('create')
    async createAction(@Body() createActionDto:createActionDto){
    const ret = await this.actionService.createAction(createActionDto)
    
    //console.log(ret)
    return ret
}
}
