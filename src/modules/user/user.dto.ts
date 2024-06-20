import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
} from 'class-validator';

/**
 * Data transfer object for signing in a user.
 */
export class SignInDto {
  /**
   * The email of the user.
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * The password of the user.
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * Data transfer object for signing up a user.
 */
export class SignUpDto {
  /**
   * The name of the user.
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The email of the user.
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * The password of the user.
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * The address of the user.
   */
  @IsString()
  @IsNotEmpty()
  address: string;
}

/**
 * Data transfer object for getting the order history of a user.
 */
export class GetOrderHistoryDto {
  /**
   * The user ID.
   */
  @IsPositive()
  @Type(() => Number)
  userId: string;
}
