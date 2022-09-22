import { IsNotEmpty } from "class-validator"

export class assignedPermissionDto{
    // tenantId:number
    id:number
    tenantId:number
    tenantRoleDetailsId:number
    permissionsId:number
    isTrue:boolean
}
export class Permission{
    tenantRoleDetailsId:number
    tenantId:number
    permissions:Array<createPermission>
}
export class createPermission{
   module:string
   subModule:string
   actions:createAction[]
}
export class createAction{
   action:string
   value:boolean
}
export class array{
    array:createPermission[]
}
export class createPermissionDto{ 
    route:string
    subRoute:string
    productsId:number
    actionsId:number
}
export class Role{
    id:number
}