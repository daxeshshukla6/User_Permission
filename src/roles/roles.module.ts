import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  TenantPermissionService } from 'src/tenantpermission/tenantpermission.service';
import { UserActionMaster } from '../typeOrm/action.entity';
import { FieldMaster } from 'src/typeOrm/field_master.entity';
import { PermissionMaster } from 'src/typeOrm/permission.entity';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { RoleDetailedMaster } from 'src/typeOrm/role_detailed_master.entity';
import { RoleMaster } from 'src/typeOrm/role_master.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PermissionService } from 'src/global/permission/permission.service';
import { RolesRestController } from './rolesRest.controller';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { checks } from './checks';
import { User } from 'src/typeOrm';

@Module({
  imports:[TypeOrmModule.forFeature([UserActionMaster,PermissionMaster,ProductMaster,FieldMaster,RoleMaster,RoleDetailedMaster,TenantRoles,TenantRolesDetailed,TenantPermission,User],'tenant_role_management'),
  JwtModule.register({
    secret: 'jwt',
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [RolesController,RolesRestController],
  providers: [RolesService,TenantPermissionService,PermissionService,checks,TenantPermissionService]
})
export class RolesModule {}
