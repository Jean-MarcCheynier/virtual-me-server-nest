import { TestingModule } from '@nestjs/testing';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { User } from '../../src/user/schema/user.schema';
import { UserService } from '../../src/user/user.service';
import { FixtureBuilder } from './fixture.builder';
import { faker } from '@faker-js/faker';

export class UserBuilder extends FixtureBuilder<User> {
  constructor(module: TestingModule) {
    super(module, UserService);
    this.fixture = {
      username: faker.helpers.unique(faker.name.firstName),
      email: faker.helpers.unique(faker.internet.email),
      roles: [Role.USER],
      password: 'test',
      conversations: [],
    };
  }

  withRoles(roles: Role[]) {
    this.fixture.roles = roles;
    return this;
  }
  withPassword(password: string) {
    this.fixture.password = password;
    return this;
  }
}
