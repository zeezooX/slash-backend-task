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

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user.userId });

    return { access_token: token };
  }

  async signUp(signUpDto: SignUpDto) {
    if(await this.prisma.user.findUnique({ where: { email: signUpDto.email } })) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
      },
    });

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

  async getOrderHistory(getOrderHistoryDto: GetOrderHistoryDto) {
    return this.prisma.order.findMany({
      where: {
        userId: parseInt(getOrderHistoryDto.userId),
      },
    });
  }
}
