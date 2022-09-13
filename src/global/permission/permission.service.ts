import { Injectable } from '@nestjs/common';
import { ROUTES } from '@nestjs/core/router/router-module';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserActionMaster } from 'src/typeOrm/action.entity';
import { TenantPermission } from 'src/typeOrm/tenant_permission.entity';
import { TenantRoles } from 'src/typeOrm/tenant_roles.entity';
import { TenantRolesDetailed } from 'src/typeOrm/tenant_roles_detailed.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PermissionService {
        constructor(
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly permissionRepo: Repository<TenantPermission>,
        @InjectRepository(UserActionMaster,'tenant_role_management') private readonly actionRepository: Repository<UserActionMaster>,
        @InjectRepository(TenantRolesDetailed,'tenant_role_management') private readonly tenantRoleDetailedRepository:Repository<TenantRolesDetailed>,
        @InjectRepository(TenantRoles,'tenant_role_management') private readonly tenantRoleRepository:Repository<TenantRoles>,
        @InjectRepository(TenantPermission,'tenant_role_management') private readonly tenantPermissionRepo:Repository<TenantPermission>,
        @InjectDataSource('tenant_role_management') private tenantDataSource: DataSource,
    ) { } 
    async createPermission(createPermissionDto){
      const newPermission = await this.permissionRepo.create(createPermissionDto);
       return this.tenantPermissionRepo.save(newPermission);
  }
    
    async getPermission(productid:number){
        const modules=await this.permissionRepo.find({
            select:{
                route:true,
                subRoute:true,
                actions:{
                    actionName:true
                }
            },relations:{
                actions:true
            },
            where:{
                products:{
                    id:productid
                }
            }
        })
        const output1 = [];
  modules.forEach((x)=>{
    const y = {
      module:x.route,
      subModule:x.subRoute,
      actions:[
        {
          action:x.actions.actionName,
          value:true
        }
      ]
    }
    output1.push(y)
  })
var output2 = [];

  output1.forEach(function(item) {
    var existing = output2.filter(function(v, i) {
      return v.module == item.module && v.subModule == item.subModule;
    });
    if (existing.length) {
      var existingIndex = output2.indexOf(existing[0]);
      output2[existingIndex].actions = output2[existingIndex].actions.concat(item.actions);
    } else{
      output2.push(item)
    }
  });
    console.log(output2)  
      return {permissions:output2}
    }
}
