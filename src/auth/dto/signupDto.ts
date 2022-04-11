import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'Username',
    required: true,
  })
  username: string;
  @ApiProperty({
    description: 'User password',
    required: true,
  })
  password: string;
  @ApiProperty({
    description: 'User email',
    required: false,
  })
  email: string;
}
