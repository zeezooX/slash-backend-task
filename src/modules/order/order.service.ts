import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { ApplyCouponDto } from './dtos/apply-coupon.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create an order.
   * @param userId - The ID of the user.
   * @returns The created order.
   * @throws NotFoundException if the user is not found.
   * @throws NotFoundException if the cart is empty.
   * @throws ConflictException if there is not enough stock.
   */
  async createOrder(userId: number) {
    // Get the cart of the user
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // Check if the userId is valid
    if (!cart) {
      throw new NotFoundException('User not found');
    }

    // Get the items in the cart
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cartId: cart.cartId,
      },
    });

    // Check if the cart is empty
    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    // Check if stock is available
    for (const cartItem of cartItems) {
      const product = await this.prisma.product.findUnique({
        where: {
          productId: cartItem.productId,
        },
      });

      if (product.stock < cartItem.quantity) {
        throw new ConflictException('Not enough stock');
      }
    }

    // Update the stock of the products
    for (const cartItem of cartItems) {
      await this.prisma.product.update({
        where: {
          productId: cartItem.productId,
        },
        data: {
          stock: {
            decrement: cartItem.quantity,
          },
        },
      });
    }

    // Create an order
    const order = await this.prisma.order.create({
      data: {
        status: 'Pending',
        userId,
        discount: 0,
      },
    });

    // Create order items
    for (const cartItem of cartItems) {
      await this.prisma.orderItem.create({
        data: {
          orderId: order.orderId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        },
      });
    }

    // Delete the cart
    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.cartId,
      },
    });
    await this.prisma.cart.delete({
      where: {
        cartId: cart.cartId,
      },
    });

    // Create a new cart
    await this.prisma.cart.create({
      data: {
        userId,
      },
    });

    return this.getOrderById(order.orderId);
  }

  /**
   * Get an order by ID.
   * @param orderId - The ID of the order.
   * @returns The order with the specified ID.
   * @throws NotFoundException if the order is not found.
   **/
  async getOrderById(orderId: number) {
    // Get the order
    const order = await this.prisma.order.findUnique({
      where: {
        orderId,
      },
    });

    // Check if the order exists
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Get the items for the order
    order['items'] = await this.prisma.orderItem.findMany({
      where: {
        orderId,
      },
    });

    // Get the products for the items
    const products = {};
    for (const item of order['items']) {
      products[item.productId] = await this.prisma.product.findUnique({
        where: {
          productId: item.productId,
        },
      });
    }

    // Calculate the total for the order
    order['total'] = order['items'].reduce(
      (total, item) => total + item.quantity * products[item.productId].price,
      0,
    );
    order['total'] = (order['total'] * (1 - order.discount / 100)).toFixed(2);

    return order;
  }

  /**
   * Update the status of an order.
   * @param orderId - The ID of the order.
   * @param userId - The ID of the user.
   * @param updateOrderStatusDto - The data to update the order status.
   * @returns The updated order.
   * @throws NotFoundException if the order is not found.
   * @throws UnauthorizedException if the order does not belong to the user.
   */
  async updateOrderStatus(
    orderId: number,
    userId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    // Get the order
    const order = await this.prisma.order.findUnique({
      where: {
        orderId,
      },
    });

    // Check if the order exists
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if the user is the owner of the order
    if (order.userId !== userId) {
      throw new UnauthorizedException('Order does not belong to user');
    }

    // Update the status of the order
    await this.prisma.order.update({
      where: {
        orderId,
      },
      data: {
        status: updateOrderStatusDto.status,
      },
    });

    return this.getOrderById(orderId);
  }

  /**
   * Apply a coupon to an order.
   * @param userId - The ID of the user.
   * @param applyCouponDto - The data to apply the coupon.
   * @returns The updated order.
   * @throws NotFoundException if the order is not found.
   * @throws UnauthorizedException if the order does not belong to the user.
   * @throws ConflictException if the order is not pending.
   * @throws NotFoundException if the coupon is not found.
   */
  async applyCoupon(userId: number, applyCouponDto: ApplyCouponDto) {
    // Get the order
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: applyCouponDto.orderId,
      },
    });

    // Check if the order exists
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if the order belongs to the user
    if (order.userId !== userId) {
      throw new UnauthorizedException('Order does not belong to user');
    }

    // Check if the order is pending
    if (order.status !== 'Pending') {
      throw new ConflictException('Order is not pending');
    }

    // Get the coupon
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code: applyCouponDto.couponCode,
      },
    });

    // Check if the coupon exists
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    // Apply the discount
    await this.prisma.order.update({
      where: {
        orderId: applyCouponDto.orderId,
      },
      data: {
        discount: coupon.discount,
      },
    });

    return this.getOrderById(applyCouponDto.orderId);
  }
}
