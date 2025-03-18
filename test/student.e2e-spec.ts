import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('StudentsController E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();   // Creates testing environment

      app = moduleFixture.createNestApplication();
      await app.init();
  });

  // This is an actual test case
  it(`/GET students`, () => {
    return request(app.getHttpServer())
      .get('/student')
      .expect(200)
      .expect([]);
  });

  afterAll(async () => {
    await app.close();
  });
});
