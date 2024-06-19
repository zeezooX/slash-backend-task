import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
  ApplyCouponDto,
} from './order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {}

  async getOrderById(orderId: string) {}

  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {}

  async applyCoupon(applyCouponDto: ApplyCouponDto) {}
}
