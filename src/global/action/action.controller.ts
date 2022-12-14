import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RolesService } from 'src/roles/roles.service';
import { createActionDto } from '../../dtos/action.dto';
import { ActionService } from './action.service';

@Controller('action')
export class ActionController{
constructor(private readonly actionService:ActionService) {}

    @GrpcMethod('globalRoleManagement','GetAction')
 async GetAction(){
     const res = await this.actionService.getActions()
     
     return res
}

@GrpcMethod('globalRoleManagement','CreateAction')
async createAction( createActionDto:createActionDto){
    const ret = await this.actionService.createAction(createActionDto)
    
    //console.log(ret)
    return ret
}
}
