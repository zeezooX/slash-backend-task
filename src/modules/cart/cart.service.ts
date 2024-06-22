import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { RemoveFromCartDto } from './dtos/remove-from-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Add a product to the cart.
   * @param userId - The ID of the user.
   * @param addToCartDto - The data to add to the cart.
   * @returns A promise that resolves to the result of the add to cart operation.
   * @throws NotFoundException if the product is not found.
   */
  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    // Check if the product exists
    if (
      !(await this.prisma.product.findUnique({
        where: { productId: addToCartDto.productId },
      }))
    ) {
      throw new NotFoundException('Product not found');
    }

    // Get the cart of the user
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // Get the item in the cart
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.cartId,
        productId: addToCartDto.productId,
      },
    });

    // Check if the product is already in the cart
    if (cartItem) {
      await this.prisma.cartItem.update({
        where: {
          cartItemId: cartItem.cartItemId,
        },
        data: {
          quantity: addToCartDto.quantity,
        },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          productId: addToCartDto.productId,
          quantity: addToCartDto.quantity,
        },
      });
    }

    return await this.viewCart(userId);
  }

  /**
   * View the cart of a user.
   * @param userId - The ID of the user.
   * @returns The cart of the user.
   */
  async viewCart(userId: number) {
    // Get the cart of the user
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // Get the items in the cart
    cart['items'] = await this.prisma.cartItem.findMany({
      where: {
        cartId: cart.cartId,
      },
    });

    return cart;
  }

  /**
   * Update the cart of a user.
   * @param userId - The ID of the user.
   * @param updateCartDto - The data to update the cart.
   * @returns A promise that resolves to the result of the update cart operation.
   * @throws NotFoundException if the product is not found or not in the cart.
   */
  async updateCart(userId: number, updateCartDto: UpdateCartDto) {
    // Check if the product exists
    if (
      !(await this.prisma.product.findUnique({
        where: { productId: updateCartDto.productId },
      }))
    ) {
      throw new NotFoundException('Product not found');
    }

    // Get the cart of the user
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // Get the item in the cart
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.cartId,
        productId: updateCartDto.productId,
      },
    });

    // Check if the product is in the cart
    if (!cartItem) {
      throw new NotFoundException('Product not found in cart');
    }

    // Update the quantity of the item in the cart
    await this.prisma.cartItem.update({
      where: {
        cartItemId: cartItem.cartItemId,
      },
      data: {
        quantity: updateCartDto.quantity,
      },
    });

    return await this.viewCart(userId);
  }

  /**
   * Remove a product from the cart.
   * @param userId - The ID of the user.
   * @param removeFromCartDto - The data to remove from the cart.
   * @returns A promise that resolves to the result of the remove from cart operation.
   * @throws NotFoundException if the product is not found or not in the cart.
   */
  async removeFromCart(userId: number, removeFromCartDto: RemoveFromCartDto) {
    // Check if the product exists
    if (
      !(await this.prisma.product.findUnique({
        where: { productId: removeFromCartDto.productId },
      }))
    ) {
      throw new NotFoundException('Product not found');
    }

    // Get the cart of the user
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    // Get the item in the cart
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.cartId,
        productId: removeFromCartDto.productId,
      },
    });

    // Check if the product is in the cart
    if (!cartItem) {
      throw new NotFoundException('Product not found in cart');
    }

    // Remove the item from the cart
    await this.prisma.cartItem.delete({
      where: {
        cartItemId: cartItem.cartItemId,
      },
    });

    return await this.viewCart(userId);
  }
}
