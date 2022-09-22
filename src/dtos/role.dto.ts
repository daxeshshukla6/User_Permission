import { IsNotEmpty, IsString } from "class-validator";

export class createRoleDto{
    
    @IsNotEmpty()
    id:number

    @IsString()
    roleName:string
    @IsString()
    roleDesc:string
    roleStatus:boolean
    isGlobal:boolean
    tenantId:number
}
export class createTenantRole{
    id:number
    isTrue:boolean
}

