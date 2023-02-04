import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { response } from 'express';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(
    async () => {
      await app.close();
    },
    50000, // This teardown can take some time, so we allow a bigger timeout
  );

  it.only('/ (GET)', async () => {
    //Arrange
    const signupMock = {
      username: 'string2',
      password: 'string',
      email: 'string2',
    };

    //Act
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupMock);

    //Assert
    expect(response.status).toBe(HttpStatus.CREATED);

    console.log(response.body);
  });
});
