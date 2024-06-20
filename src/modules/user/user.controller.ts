import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { GetOrderHistoryDto, SignInDto, SignUpDto } from './user.dto';
import { Public } from 'src/common/public.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Sign in a user.
   * @param signInDto - The sign in data.
   * @returns A promise that resolves to the result of the sign in operation.
   */
  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiBody({
    type: SignInDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User signed in successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid password',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
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
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({
    type: SignUpDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User signed up successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Email already exists',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  /**
   * Get the order history for a user.
   * @param getOrderHistoryDto - The data to retrieve the order history.
   * @returns A promise that resolves to the order history of the user.
   */
  @Get(':userId/orders')
  @ApiOperation({ summary: 'Get the order history for a user' })
  @ApiResponse({
    status: 200,
    description: 'Order history retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource',
  })
  @ApiBearerAuth('access-token')
  async getOrderHistory(@Param() getOrderHistoryDto: GetOrderHistoryDto) {
    return this.userService.getOrderHistory(getOrderHistoryDto);
  }
}
