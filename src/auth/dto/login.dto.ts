import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'robert',
    description: 'Username',
    required: true,
  })
  username: string;
  @ApiProperty({
    example: 'redford',
    description: 'User name',
    required: true,
  })
  password: string;
}
