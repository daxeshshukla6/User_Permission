import { IsNotEmpty } from "class-validator";

export class createProductDto{
    
    
    productName:string
    productCode:string
    productDesc:string
    entryBy:string
    entryDate:Date
    lastUpdateBy:string
    lastUpdateDate:Date
    parentId:number
}