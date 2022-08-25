import { User } from "./user.entity";
import { RoleMaster } from "./role_master.entity";
import { UserRole } from "./user_role.entity";
import { UserActionMaster } from "./action.entity";
import { ProductMaster } from "./product.entity";
import { PermissionMaster } from "./permission.entity";
import { RoleDetailedMaster } from "./role_detailed_master.entity";
import { TenantRolesDetailed } from "./tenant_roles_detailed.entity";
import { TenantRoles } from "./tenant_roles.entity";
import { UserGroup } from "./usergroup.entity";
import { GroupMember } from "./groupmember.entity";
import { FieldMaster } from "./field_master.entity";
import { TenantMasterRole } from "./tenant_master_role.entity";
const entities = [UserGroup,
                  User,
                  UserRole,
                  UserActionMaster,
                  FieldMaster,
                  GroupMember,
                  PermissionMaster,
                  ProductMaster,
                  RoleDetailedMaster,
                  RoleMaster,
                  TenantMasterRole,
                  TenantRoles,
                  TenantRolesDetailed,
                  ];

export {User};
export default entities;