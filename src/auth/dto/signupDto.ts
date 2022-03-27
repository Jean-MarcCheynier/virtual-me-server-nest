import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'Username',
    required: true,
  })
  name: string;
  @ApiProperty({
    description: 'User name',
    required: true,
  })
  password: string;
}
