import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './config/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CartModule,
    OrderModule,
    UserModule,
  ],
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
