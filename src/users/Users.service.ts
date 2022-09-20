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
   async createUser(createUserDto: createUserDto) {
      
        const newUser =await this.userRepository.create(createUserDto);
        
        return await this.userRepository.save(newUser);
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
        
        const resp =await this.getRolenameById(userid)
             
const response ={
    ...resp,
    ...res[0]
}
 console.log(response)   

return res[0]
        
    }
    async getRolenameById(userid:number){
        const resp =await this.userRoleRepository.find({
            select:{
                tenantRoles:{
                   roleName:true
                },
                
        },
        relations:{
            tenantRoles:true
        }
        ,where:{
           user:{
            id:userid
           } 
        }
        
    })
    const output1 = [];
    resp.forEach((x)=>{
    const y = {
     roles:[   
    {
        rolename:x.tenantRoles.roleName 
    } 
    ]
     
    
    }
    //console.log(y)
     output1.push(y)
    })
    var output2 = [];
    
    output1.forEach(function(item) {
     var existing = output2.filter(function(v, i) {
       return v.roleName == item.roleName 
      });
      //console.log(existing)
     if (existing.length) {
       var existingIndex = output2.indexOf(existing[0]);
       output2[existingIndex].roles = output2[existingIndex].roles.concat(item.roles);
     } else{
       output2.push(item)
     }
    })
    const y = output2
    const x = {
            roles:y.map((x)=>x.roles)
         } 
         console.log(JSON.stringify(x))
    //console.log(JSON.stringify(output2[0]))  
     return output2[0]
    }
    
    

//This function is for updatting user details 
    async updateUser(@Body() createUserDto:createUserDto){
        await this.userRepository.update( createUserDto.id,createUserDto)
         const res=await this.userRepository.findOneBy(createUserDto)
            
         return res
}   
//This function is for assign Role to User 
async assignRole(request:roleToUser){

    // console.log(request.role)
    request.role.forEach(async(x)=>{
        request.user.forEach(async(y)=>{
        const assignrole=new UserRole()
        assignrole.user_id=y
        assignrole.tenant_role_id=x
        const z= await this.userRoleRepository.save(assignrole)
})})
    
    return 'role assigned successfully'
} 
    
   
}
