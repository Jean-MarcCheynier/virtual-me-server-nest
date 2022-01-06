import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@virtual-me/virtual-me-ts-core';

export class LoginDto {
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
