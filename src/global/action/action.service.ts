import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { Repository } from 'typeorm';
import { createActionDto } from '../../dtos/action.dto';

@Injectable()
export class ActionService {
   constructor(
    @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>
   ){}

    async createAction(createActionDto:createActionDto){
        const newAction = this.actionRepository.create(createActionDto)
        let action = JSON.stringify(newAction)
        action = JSON.parse(action) 
        const re = await this.actionRepository.save(createActionDto)
    
        return re
    }
    async getActions(){
        const res= JSON.stringify(await this.actionRepository.find())
       const resp = JSON.parse(res)
        return resp
    }
}
