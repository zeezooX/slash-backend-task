import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetOrderHistoryDto, SignInDto, SignUpDto } from './user.dto';
import { Public } from 'src/common/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Sign in a user.
   * @param signInDto - The sign in data.
   * @returns A promise that resolves to the result of the sign in operation.
   */
  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  /**
   * Sign up a new user.
   * @param signUpDto - The sign up data.
   * @returns A promise that resolves to the result of the sign up operation.
   */
  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  /**
   * Get the order history for a user.
   * @param getOrderHistoryDto - The data to retrieve the order history.
   * @returns A promise that resolves to the order history of the user.
   */
  @Get(':userId/orders')
  async getOrderHistory(@Param() getOrderHistoryDto: GetOrderHistoryDto) {
    return this.userService.getOrderHistory(getOrderHistoryDto);
  }
}
