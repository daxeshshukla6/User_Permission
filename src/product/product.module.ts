import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMaster } from 'src/typeOrm/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProductMaster],'tenant_role_management')],
  controllers:[ProductController],
  providers: [ProductService]
})
export class ProductModule {}
