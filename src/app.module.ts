import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './config/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CartModule, OrderModule, ProductModule, UserModule, ConfigModule.forRoot()],
  providers: [
    PrismaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
