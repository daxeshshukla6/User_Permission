import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { assignroletouser, createUserDto, roleToUser } from 'src/dtos/users.dto';
import { Repository } from 'typeorm';
import { UserRole } from 'src/typeOrm/user_role.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User,'tenant_role_management') private readonly userRepository: Repository<User>,
        @InjectRepository(UserRole,'tenant_role_management') private readonly userRoleRepository:Repository<UserRole>
        
    ) { }                                                                        
//This function is for creating user details 
    createUser(createUserDto: createUserDto) {
      
        const newUser = this.userRepository.create(createUserDto);
        
        return this.userRepository.save(newUser);
    }
//This function is for Getting all user detials 
    async getUsers(){
        const res= await this.userRepository.find()
        return {
            GetUser:res
        }
    }

//This function is for getting user by id
    async getuserbyid(userid:number){
    const res= await this.userRepository.find({
            where:{
                id:userid
            }
        })
        
        return res[0]
        
    }

//This function is for updatting user details 
    async updateUser(@Body() createUserDto:createUserDto){
        await this.userRepository.update( createUserDto.id,createUserDto)
         const res=await this.userRepository.findOneBy(createUserDto)
            
         return res
}   
async assignRole(request:roleToUser){

    // console.log(request.role)
    request.role.forEach(async(x)=>{
        
        const assignrole=new UserRole()
        assignrole.user_id=request.user_id
        assignrole.tenant_role_id=x
        const z= await this.userRoleRepository.save(assignrole)
        })
    
    return 'role assigned successfully'
} 
    
   
}
