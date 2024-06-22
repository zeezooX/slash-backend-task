import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { RestockProductDto } from './dtos/restock-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all products.
   * @returns An array of products.
   */
  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  /**
   * Add a product.
   * @param createProductDto - The product data.
   * @returns The created product.
   */
  async addProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  /**
   * Increment the stock of a product.
   * @param productId - The ID of the product to restock.
   * @param restockProductDto - The restock data.
   * @returns The updated product.
   */
  async restockProduct(
    productId: number,
    restockProductDto: RestockProductDto,
  ) {
    const { quantity } = restockProductDto;
    return this.prisma.product.update({
      where: { productId },
      data: { stock: { increment: quantity } },
    });
  }
}
