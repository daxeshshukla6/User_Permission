import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductMaster } from 'src/typeOrm/product.entity';
import { Repository } from 'typeorm';
import { createProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductMaster,'tenant_role_management') private readonly productRepository: Repository<ProductMaster>
        
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
