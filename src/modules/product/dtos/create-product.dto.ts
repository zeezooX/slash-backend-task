import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

/**
 * Data transfer object for creating a product.
 */
export class CreateProductDto {
  /**
   * The name of the product.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the product',
    required: true,
    example: 'Eggplants',
  })
  name: string;

  /**
   * The description of the product.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The description of the product',
    required: true,
    example: 'Eggplants are a good source of fiber and antioxidants.',
  })
  description: string;

  /**
   * The price of the product.
   */
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'The price of the product',
    required: true,
    example: 1.99,
  })
  price: number;

  /**
   * The quantity of the product in stock.
   */
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'The quantity of the product in stock',
    required: true,
    example: 100,
  })
  stock: number;
}
