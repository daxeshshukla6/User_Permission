import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeOrm';
import { GroupMember } from 'src/typeOrm/groupmember.entity';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { TenantMasterRole } from 'src/typeOrm/tenant_master_role.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { UserGroup } from 'src/typeOrm/usergroup.entity';
import { UserRole } from 'src/typeOrm/user_role.entity';
import { UsersRestController } from './userRest.controller';
import { UsersController } from './users.controller';
import { UsersService } from './Users.service';

@Module({
  imports:[TypeOrmModule.forFeature([GroupMember,TenantRoles,TenantRolesDetailed,TenantMasterRole,User,UserRole,UserGroup],'tenant_role_management')],
  controllers: [UsersController,UsersRestController],
  providers: [UsersService]
})
export class UsersModule {}
