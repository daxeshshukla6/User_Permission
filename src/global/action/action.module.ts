import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActionMaster } from '../../typeOrm/action.entity';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ActionControllerRest } from './actionRest.controller';

@Module({
  imports:[TypeOrmModule.forFeature([UserActionMaster],'tenant_role_management')],
  controllers:[ActionController,ActionControllerRest],
  providers: [ActionService]
})
export class ActionModule {}
