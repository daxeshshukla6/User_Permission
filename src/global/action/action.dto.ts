import { IsNotEmpty } from "class-validator";

export class createActionDto{
    actionName:string
    entryBy:string
    lastUpdatedBy:string
    entryDate : Date
    lastUpdateDate : Date

}