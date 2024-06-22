import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

/**
 * Data transfer object for applying a coupon to an order.
 */
export class ApplyCouponDto {
  /**
   * The coupon code.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The coupon code',
    required: true,
    example: 'SAVE10',
  })
  couponCode: string;

  /**
   * The ID of the order.
   */
  @IsInt()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'The ID of the order',
    required: true,
    example: 1,
  })
  orderId: number;
}
