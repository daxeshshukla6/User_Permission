import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { createUserDto } from 'src/users/userDto/users.dto';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User,'tenant_role_management') private readonly userRepository: Repository<User>,
        
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
    async getuserbyid(id){
        return  await this.userRepository.findOneBy(id)
    }

//This function is for updatting user details 
    async updateUser(@Body() createUserDto:createUserDto){
        await this.userRepository.update( createUserDto.id,createUserDto)
         const res=await this.userRepository.findOneBy(createUserDto)
            
         return res
}    
    
   
}
