import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from './typeOrm'
import { UserActionMaster } from './typeOrm/action.entity'
import { FieldMaster } from './typeOrm/field_master.entity'
import { GroupMember } from './typeOrm/groupmember.entity'
import { PermissionMaster } from './typeOrm/permission.entity'
import { ProductMaster } from './typeOrm/product.entity'
import { RoleDetailedMaster } from './typeOrm/role_detailed_master.entity'
import { RoleMaster } from './typeOrm/role_master.entity'
import { TenantMasterRole } from './typeOrm/tenant_master_role.entity'
import { TenantPermission } from './typeOrm/tenant_permission.entity'
import { TenantRoles } from './typeOrm/tenant_roles.entity'
import { TenantRolesDetailed } from './typeOrm/tenant_roles_detailed.entity'
import { UserGroup } from './typeOrm/usergroup.entity'
import { UserRole } from './typeOrm/user_role.entity'


require('dotenv').config()
export const globalDatabaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME1,
    synchronize: true,
    entities:[UserActionMaster,PermissionMaster,ProductMaster,FieldMaster,RoleMaster,RoleDetailedMaster],
}

export const tenantDatabaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD ,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    synchronize: true,
    entities:[GroupMember,TenantRoles,TenantRolesDetailed,TenantMasterRole,User,UserRole,UserGroup,TenantPermission],
}

