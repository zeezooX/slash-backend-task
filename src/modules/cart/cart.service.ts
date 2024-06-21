import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { RemoveFromCartDto } from './dtos/remove-from-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(addToCartDto: AddToCartDto) {}

  async viewCart(userId: string) {}

  async updateCart(updateCartDto: UpdateCartDto) {}

  async removeFromCart(removeFromCartDto: RemoveFromCartDto) {}
}
