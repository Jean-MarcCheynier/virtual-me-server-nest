import { Role } from '@virtual-me/virtual-me-ts-core';

export class CreateUserDto {
  name: string;
  email: string;
  role: Role;
  login: string;
}
