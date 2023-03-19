import { TestingModule } from '@nestjs/testing';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { User } from '@main/user/schema/user.schema';
import { UserService } from '@main/user/user.service';
import { FixtureBuilder } from './fixture.builder';
import { faker } from '@faker-js/faker';

export class UserBuilder extends FixtureBuilder<User> {
  constructor(module: TestingModule) {
    super(module, UserService);
    this.fixture = {
      username: faker.helpers.unique(faker.name.firstName),
      email: faker.helpers.unique(faker.internet.email),
      firstName: faker.helpers.unique(faker.name.firstName),
      lastName: faker.helpers.unique(faker.name.lastName),
      roles: [Role.USER],
      password: 'test',
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
