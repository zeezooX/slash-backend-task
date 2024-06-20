import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  ApplyCouponDto,
} from './order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, updateOrderStatusDto);
  }

  @Post('apply-coupon')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return this.orderService.applyCoupon(applyCouponDto);
  }
}
