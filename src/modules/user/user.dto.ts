import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class GetOrderHistoryDto {
  @IsPositive()
  @Type(() => Number)
  userId: string;
}
