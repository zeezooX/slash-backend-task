import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateCartDto {
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
