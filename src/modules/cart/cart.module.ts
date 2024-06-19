import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaService } from '../../config/prisma.service';
import { CartController } from './cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
