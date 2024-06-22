import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { RemoveFromCartDto } from './dtos/remove-from-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Add a product to the cart.
   * @param req - The request object.
   * @param addToCartDto - The data to add to the cart.
   * @returns A promise that resolves to the result of the add to cart operation.
   */
  @Post('add')
  @ApiOperation({ summary: 'Add a product to the cart' })
  @ApiBody({
    type: AddToCartDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Product added to cart successfully',
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
    description: 'Product not found',
  })
  @ApiBearerAuth('access-token')
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.payload.userId, addToCartDto);
  }

  /**
   * View the cart of a user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the cart of the user.
   */
  @Get(':userId')
  @ApiOperation({ summary: 'View the cart of a user' })
  @ApiResponse({
    status: 200,
    description: 'Cart viewed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'None or invalid token provided',
  })
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The ID of the user',
    example: 1,
    required: true,
  })
  async viewCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.viewCart(userId);
  }

  /**
   * Update the cart of a user.
   * @param req - The request object.
   * @param updateCartDto - The data to update the cart.
   * @returns A promise that resolves to the result of the update cart operation.
   */
  @Put('update')
  @ApiOperation({ summary: 'Update the cart of a user' })
  @ApiBody({
    type: UpdateCartDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Cart updated successfully',
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
    description: 'Product not found or not in the cart',
  })
  @ApiBearerAuth('access-token')
  async updateCart(@Request() req, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(req.payload.userId, updateCartDto);
  }

  /**
   * Remove a product from the cart.
   * @param req - The request object.
   * @param removeFromCartDto - The data to remove from the cart.
   * @returns A promise that resolves to the result of the remove from cart operation.
   */
  @Delete('remove')
  @ApiOperation({ summary: 'Remove a product from the cart' })
  @ApiBody({
    type: RemoveFromCartDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Product removed from cart successfully',
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
    description: 'Product not found or not in the cart',
  })
  @ApiBearerAuth('access-token')
  async removeFromCart(
    @Request() req,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.cartService.removeFromCart(req.payload.userId, removeFromCartDto);
  }
}
