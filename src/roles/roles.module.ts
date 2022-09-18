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

@Module({
  imports:[TypeOrmModule.forFeature([UserActionMaster,PermissionMaster,ProductMaster,FieldMaster,RoleMaster,RoleDetailedMaster,TenantRoles,TenantRolesDetailed,TenantPermission],'tenant_role_management'),
    //TypeOrmModule.forFeature([],'tenant_role_management')
],
  controllers: [RolesController,RolesRestController],
  providers: [RolesService,TenantPermissionService,PermissionService]
})
export class RolesModule {}
