import { Body, Controller, Get, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { createProductDto } from '../../dtos/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductRestController {
    constructor(private readonly productService:ProductService){}
    @Post('create')
    async CreateProduct(@Body()createProductDto:createProductDto){
        const res= await this.productService.createProduct(createProductDto)
    //    console.log(res)
        return res
    }
    @Get('get')
    async GetProduct(){
        const res= await this.productService.getProduct();
        const  re={
            GetProduct:res
        }
        return re
    }
}
