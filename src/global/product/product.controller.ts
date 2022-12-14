import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createProductDto } from '../../dtos/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}
    @GrpcMethod('globalRoleManagement','CreateProduct')
    async CreateProduct(createProductDto:createProductDto){
        const res= await this.productService.createProduct(createProductDto)
    //    console.log(res)
        return res
    }
    @GrpcMethod('globalRoleManagement','GetProduct')
    async GetProduct(){
        const res= await this.productService.getProduct();
        const  re={
            GetProduct:res
        }
        return re
    }
}
