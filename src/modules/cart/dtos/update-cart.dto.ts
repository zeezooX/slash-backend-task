import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

/**
 * Data transfer object for updating a product in the cart.
 */
export class UpdateCartDto {
  /**
   * The ID of the product to update in the cart.
   */
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The ID of the product to update in the cart',
    required: true,
    example: 1,
  })
  productId: number;

  /**
   * The quantity of the product to update in the cart.
   */
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The quantity of the product to update in the cart',
    required: true,
    example: 3,
  })
  quantity: number;
}
