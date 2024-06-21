import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

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
