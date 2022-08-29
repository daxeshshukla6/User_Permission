import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}
    @GrpcMethod('RoleManagement','CreateProduct')
    async CreateProduct(createProductDto:createProductDto){
        const res= await this.productService.createProduct(createProductDto)
    //    console.log(res)
        return res
    }
    @GrpcMethod('RoleManagement','GetProduct')
    async GetProduct(){
        const res= await this.productService.getProduct();
        const  re={
            GetProduct:res
        }
        return re
    }
}
