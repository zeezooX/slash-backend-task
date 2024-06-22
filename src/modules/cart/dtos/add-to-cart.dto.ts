import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

/**
 * Data transfer object for adding a product to the cart.
 */
export class AddToCartDto {
  /**
   * The ID of the product to add to the cart.
   */
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The ID of the product to add to the cart',
    required: true,
    example: 1,
  })
  productId: number;

  /**
   * The quantity of the product to add to the cart.
   */
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The quantity of the product to add to the cart',
    required: true,
    example: 2,
  })
  quantity: number;
}
