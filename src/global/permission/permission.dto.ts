import { IsNotEmpty } from "class-validator"

export class assignedPermissionDto{
    // tenantId:number
    id:number
    roleName:string
    permissionId:number
    isTrue:boolean
}
export class Permission{
    roleName:string
    permissions:createPermission[]
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
    productName:string
    actionName:string
}