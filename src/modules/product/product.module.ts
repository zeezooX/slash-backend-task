import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaService } from '../../config/prisma.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
