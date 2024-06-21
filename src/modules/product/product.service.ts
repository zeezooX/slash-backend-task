import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { RestockProductDto } from './dtos/restock-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all products.
   * @returns A promise that resolves to an array of products.
   */
  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  /**
   * Add a product.
   * @param createProductDto - The product data.
   * @returns A promise that resolves to the created product.
   */
  async addProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  /**
   * Restock a product.
   * @param productId - The ID of the product to restock.
   * @param restockProductDto - The restock data.
   * @returns A promise that resolves to the updated product.
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
