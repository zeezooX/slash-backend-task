import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, IsPositive } from 'class-validator';

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
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
    example: 'alice@example.com',
  })
  email: string;

  /**
   * The password of the user.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
    example: 'password123',
  })
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
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    required: true,
    example: 'Dorice',
  })
  name: string;

  /**
   * The email of the user.
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
    example: 'dorice@example.com',
  })
  email: string;

  /**
   * The password of the user.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
    example: 'password123',
  })
  password: string;

  /**
   * The address of the user.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The address of the user',
    required: true,
    example: '123 Main St, Anytown',
  })
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
  @ApiProperty({
    type: Number,
    description: 'The user ID',
    required: true,
    minimum: 1,
    example: 1,
  })
  userId: string;
}
