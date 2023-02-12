import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { User } from '../schema/user.schema';

export class CreateUserDto implements Partial<User> {
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
  role?: Role[];

  @ApiProperty()
  password: string;
}
