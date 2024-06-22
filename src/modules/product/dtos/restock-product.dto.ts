import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

/**
 * Data transfer object for restocking a product.
 */
export class RestockProductDto {
  /**
   * The quantity to restock.
   */
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The quantity to restock',
    required: true,
    example: 10,
  })
  quantity: number;
}
