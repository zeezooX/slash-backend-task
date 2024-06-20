import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GetOrderHistoryDto, SignInDto, SignUpDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign in a user.
   * @param signInDto - The sign-in data.
   * @returns An object containing the access token.
   * @throws NotFoundException if the user is not found.
   * @throws UnauthorizedException if the password is invalid.
   */
  async signIn(signInDto: SignInDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the password is valid
    if (!bcrypt.compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    // Generate an access token
    const token = this.jwtService.sign({ id: user.userId });

    return { 'access-token': token };
  }

  /**
   * Sign up a new user.
   * @param signUpDto - The sign-up data.
   * @returns The created user.
   * @throws UnauthorizedException if the email already exists.
   */
  async signUp(signUpDto: SignUpDto) {
    // Check if the email already exists
    if (
      await this.prisma.user.findUnique({ where: { email: signUpDto.email } })
    ) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
      },
    });

    // Create a cart for the user
    await this.prisma.cart.create({
      data: {
        user: {
          connect: {
            userId: user.userId,
          },
        },
      },
    });

    return user;
  }

  /**
   * Get the order history for a user.
   * @param getOrderHistoryDto - The data for retrieving the order history.
   * @returns An array of orders.
   */
  async getOrderHistory(getOrderHistoryDto: GetOrderHistoryDto) {
    return this.prisma.order.findMany({
      where: {
        userId: parseInt(getOrderHistoryDto.userId),
      },
    });
  }
}
