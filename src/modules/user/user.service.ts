import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { SignInDto, SignUpDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(signInDto: SignInDto) {}

  async signUp(signUpDto: SignUpDto) {}

  async getOrderHistory(userId: string) {}
}
