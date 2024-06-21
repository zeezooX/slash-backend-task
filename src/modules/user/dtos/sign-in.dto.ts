import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

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
