import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class createUserDto {
  id:number
  userName: string;
  firstName: string;
  lastName:string;
  email: string;
}
export class assignroletouser{
  user_id:number
  role_id:number
}
export class roleToUser{
user_id:number
role:number[]
}
export class role{
id:number
}
