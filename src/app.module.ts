import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import entities from './typeOrm';
import { UsersModule } from './users/users.module';
import { ActionModule } from './global/action/action.module';
import { PermissionModule } from './global/permission/permission.module';
import { ProductController } from './global/product/product.controller';
import { ProductModule } from './global/product/product.module';
import { tenantDatabaseConfig } from './orm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot({...tenantDatabaseConfig, name:'tenant_role_management'}),
    //TypeOrmModule.forRoot({...globalDatabaseConfig, name:'global_role_management'}),
    UsersModule
    ,RolesModule, ActionModule, PermissionModule, ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
