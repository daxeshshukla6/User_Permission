import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActionMaster } from '../../typeOrm/action.entity';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserActionMaster],'tenant_role_management')],
  controllers:[ActionController],
  providers: [ActionService]
})
export class ActionModule {}
