import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { Repository } from 'typeorm';
import { createProductDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductMaster,'global_role_management') private readonly productRepository: Repository<ProductMaster>
        
    ){}
    async createProduct(createProductDto:createProductDto){
        
       
        
         const re= await this.productRepository.save(createProductDto)
         console.log(re)
         return re
    }
    async getProduct(){
        const ret= await this.productRepository.find()
        return ret
    }

}
