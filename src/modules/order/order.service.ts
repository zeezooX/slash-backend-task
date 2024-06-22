import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number) {}

  async getOrderById(orderId: string) {}

  async updateOrderStatus(
    orderId: string,
    userId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {}

  async applyCoupon(userId: number, applyCouponDto: ApplyCouponDto) {}
}
