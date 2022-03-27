import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@virtual-me/virtual-me-ts-core';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
  })
  username: string;
  @ApiProperty()
  email?: string;
  @ApiProperty({
    description: 'User role',
    enum: [Role.ADMIN, Role.GUEST, Role.USER],
  })
  role: Role;
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
}
