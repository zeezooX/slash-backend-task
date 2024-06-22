import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for updating the status of an order.
 */
export class UpdateOrderStatusDto {
  /**
   * The status of the order.
   */
  @IsString()
  @IsNotEmpty()
  @IsIn(['Pending', 'Shipped', 'Completed', 'Cancelled'])
  @ApiProperty({
    type: String,
    description: 'The status of the order',
    required: true,
    enum: ['Pending', 'Shipped', 'Completed', 'Cancelled'],
    example: 'Shipped',
  })
  status: string;
}
