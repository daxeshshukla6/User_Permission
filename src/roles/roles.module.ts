import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from 'src/global/permission/permission.service';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { FieldMaster } from 'src/typeOrm/field_master.entity';
import { PermissionMaster } from 'src/typeOrm/permission.entity';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { RoleDetailedMaster } from 'src/typeOrm/role_detailed_master.entity';
import { RoleMaster } from 'src/typeOrm/role_master.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
// import { role } from 'src/typeOrm/role_master.entity';
import { UserRole } from 'src/typeOrm/user_role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserActionMaster,PermissionMaster,ProductMaster,FieldMaster,RoleMaster,RoleDetailedMaster,TenantRoles,TenantRolesDetailed,TenantPermission],'tenant_role_management'),
    //TypeOrmModule.forFeature([],'tenant_role_management')
],
  controllers: [RolesController],
  providers: [RolesService,PermissionService]
})
export class RolesModule {}
