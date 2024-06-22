import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class RemoveFromCartDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The ID of the product to remove from the cart',
    required: true,
    example: 1,
  })
  productId: number;
}
