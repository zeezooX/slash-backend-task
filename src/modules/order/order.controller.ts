import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';

@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Request() req) {
    return this.orderService.createOrder(req.payload.userId);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Request() req,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, req.payload.userId, updateOrderStatusDto);
  }

  @Post(':apply-coupon')
  async applyCoupon(
    @Request() req,
    @Body() applyCouponDto: ApplyCouponDto,
  ) {
    return this.orderService.applyCoupon(req.payload.userId, applyCouponDto);
  }
}
