import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { AddToCartDto, UpdateCartDto, RemoveFromCartDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(addToCartDto: AddToCartDto) {}

  async viewCart(userId: string) {}

  async updateCart(updateCartDto: UpdateCartDto) {}

  async removeFromCart(removeFromCartDto: RemoveFromCartDto) {}
}
