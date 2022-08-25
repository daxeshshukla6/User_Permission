import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class createUserDto {
  id:number
  userName: string;
  firstName: string;
  lastName:string;
  email: string;
}