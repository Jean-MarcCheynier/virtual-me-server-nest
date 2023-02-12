import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { MongoExceptionFilter } from '../../exception-filters/mongo-exception.filter';

import { UserBuilder } from '../../../test/builder/user.builder';

import { faker } from '@faker-js/faker';
import { User } from '../../user/schema/user.schema';
import { Role } from '@virtual-me/virtual-me-ts-core';

describe('AuthController', () => {
  let app: INestApplication;
  let userBuilder: UserBuilder;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userBuilder = new UserBuilder(testingModule);

    app = testingModule.createNestApplication();
    app.useGlobalFilters(new MongoExceptionFilter());

    await app.init();
  });

  afterAll(
    async () => {
      await app.close();
    },
    50000, // This teardown can take some time, so we allow a bigger timeout
  );
  describe('GIVEN a user in db', () => {
    let existingUser: User;
    beforeAll(async () => {
      existingUser = await userBuilder.create();
    });
    it(`
    WHEN signing up with the same email address 
    THEN an eror 400 should be thrown
    `, async () => {
      //Arrange
      const signupMock = {
        username: faker.helpers.unique(faker.name.firstName),
        password: 'test',
        email: existingUser.email,
      };

      //Act
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupMock);

      //Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
    it(`
    WHEN signing up with the same username 
    THEN an eror 400 should be thrown
    `, async () => {
      //Arrange
      const signupMock = {
        username: existingUser.username,
        password: 'test',
        email: faker.helpers.unique(faker.internet.email),
      };

      //Act
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupMock);

      //Assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
    it(`
    WHEN signing up with a unique email and username 
    THEN a new user should be retrieved
    `, async () => {
      //Arrange
      const signupMock = {
        username: faker.helpers.unique(faker.name.firstName),
        password: 'test',
        email: faker.helpers.unique(faker.internet.email),
      };

      //Act
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupMock);

      //Assert
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body._id).toBeDefined();
      expect(response.body.roles).toEqual([Role.USER]);
      expect(response.body.email).toBe(signupMock.email);
      expect(response.body.username).toBe(signupMock.username);
    });
  });
});