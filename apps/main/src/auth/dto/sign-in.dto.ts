import { IsString } from 'class-validator';

export class SignInDto {
  /**
   * Username
   * @example "José"
   */
  @IsString()
  username: string;

  /**
   * Password
   * @example "Xyz0Xyz0"
   */
  @IsString()
  password: string;
}
