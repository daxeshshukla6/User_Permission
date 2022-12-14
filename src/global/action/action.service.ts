import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActionMaster } from '../../typeOrm/action.entity';
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
        const res= await this.actionRepository.find()
       
        return {
            getActions:res
        }
    }
}
