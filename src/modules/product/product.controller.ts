import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { RestockProductDto } from './dtos/restock-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Public } from 'src/common/public.decorator';

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Get all products.
   * @returns A promise that resolves to an array of products.
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Return all products',
  })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  /**
   * Add a product.
   * @param createProductDto - The product data.
   * @returns A promise that resolves to the added product.
   */
  @Post()
  @ApiOperation({ summary: 'Add a product' })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiBearerAuth('access-token')
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

  /**
   * Restock a product.
   * @param productId - The ID of the product to restock.
   * @param restockProductDto - The restock data.
   * @returns A promise that resolves to the restocked product.
   */
  @Put(':productId/restock')
  @ApiOperation({ summary: 'Restock a product' })
  @ApiBody({
    type: RestockProductDto,
  })
  @ApiParam({
    name: 'productId',
    description: 'The product ID',
    type: 'number',
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product restocked successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiBearerAuth('access-token')
  async restockProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() restockProductDto: RestockProductDto,
  ) {
    return this.productService.restockProduct(productId, restockProductDto);
  }
}
