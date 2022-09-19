import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import entities from './typeOrm';
import { UsersModule } from './users/users.module';
import { ActionModule } from './global/action/action.module';
//import { PermissionModule } from './permission/permission.module';
import { ProductController } from './global/product/product.controller';
import { ProductModule } from './global/product/product.module';
import { tenantDatabaseConfig } from './orm.config';
import { TenantPermissionModule } from './tenantpermission/tenantpermission.module';
import { PermissionModule } from './global/permission/permission.module';
import { UserGroupController } from './user-group/user-group.controller';
import { UserGroupModule } from './user-group/user-group.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({...tenantDatabaseConfig, name:'tenant_role_management'}),
    //TypeOrmModule.forRoot({...globalDatabaseConfig, name:'global_role_management'}),
    UsersModule,RolesModule, ActionModule, TenantPermissionModule, ProductModule,PermissionModule, UserGroupModule
  ],
  controllers: [UserGroupController],
  providers: [],
})
export class AppModule {}
