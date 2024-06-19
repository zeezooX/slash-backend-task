import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto, SignUpDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Get(':userId/orders')
  async getOrderHistory(@Param('userId') userId: string) {
    return this.userService.getOrderHistory(userId);
  }
}
