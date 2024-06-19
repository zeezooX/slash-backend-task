import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetOrderHistoryDto, SignInDto, SignUpDto } from './user.dto';
import { Public } from 'src/common/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Get(':userId/orders')
  async getOrderHistory(@Param() getOrderHistoryDto: GetOrderHistoryDto) {
    return this.userService.getOrderHistory(getOrderHistoryDto);
  }
}
