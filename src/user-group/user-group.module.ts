import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Module({
  providers: [UserGroupService]
})
export class UserGroupModule {}
