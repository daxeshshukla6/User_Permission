import { IsNotEmpty } from "class-validator";

export class createRoleDto{
    
    @IsNotEmpty()
    id:number
    roleName:string
    roleDesc:string
    roleStatus:boolean
    isGlobal:boolean
}