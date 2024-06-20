import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto, RemoveFromCartDto } from './cart.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get(':userId')
  async viewCart(@Param('userId') userId: string) {
    return this.cartService.viewCart(userId);
  }

  @Put('update')
  async updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(updateCartDto);
  }

  @Delete('remove')
  async removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(removeFromCartDto);
  }
}
