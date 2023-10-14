import { IsEqualToProperty } from '@main/common/decorator/class-validator/is-equal-to-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  /**
   * Username
   * @example "José"
   */
  @IsString()
  username: string;

  /**
   * Email
   * @example "josé@garcia.com"
   */
  @IsEmail()
  @IsOptional()
  email: string;

  /**
   * Password - minLength 8, minUppercase 1,
   * @example "Xyz0Xyz0"
   */
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 1,
  })
  password: string;

  /**
   * Password repeat - should match password,
   * @example "Xyz0Xyz0"
   */
  @IsEqualToProperty('password')
  passwordRepeat: string;
}
