import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';

@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Create an order.
   * @param req - The request object.
   * @returns A promise that resolves to the created order.
   **/
  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or cart is empty',
  })
  @ApiResponse({
    status: 409,
    description: 'Not enough stock',
  })
  @ApiBearerAuth('access-token')
  async createOrder(@Request() req) {
    return this.orderService.createOrder(req.payload.userId);
  }

  /**
   * Get an order by ID.
   * @param orderId - The ID of the order.
   * @returns A promise that resolves to the order with the specified ID.
   */
  @Get(':orderId')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'orderId',
    type: 'number',
    description: 'The ID of the order',
    example: 1,
  })
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  /**
   * Update the status of an order.
   * @param req - The request object.
   * @param orderId - The ID of the order.
   * @param updateOrderStatusDto - The data to update the status of the order.
   * @returns A promise that resolves to the updated order.
   */
  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiBody({
    type: UpdateOrderStatusDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Order does not belong to user',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'orderId',
    type: 'number',
    description: 'The ID of the order',
    example: 1,
  })
  async updateOrderStatus(
    @Request() req,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(
      orderId,
      req.payload.userId,
      updateOrderStatusDto,
    );
  }

  /**
   * Apply a coupon to an order.
   * @param req - The request object.
   * @param applyCouponDto - The data to apply the coupon.
   * @returns A promise that resolves to the updated order.
   */
  @Post('apply-coupon')
  @ApiOperation({ summary: 'Apply a coupon to an order' })
  @ApiBody({
    type: ApplyCouponDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Coupon applied successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found or coupon not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Order is not pending',
  })
  @ApiBearerAuth('access-token')
  async applyCoupon(@Request() req, @Body() applyCouponDto: ApplyCouponDto) {
    return this.orderService.applyCoupon(req.payload.userId, applyCouponDto);
  }
}
