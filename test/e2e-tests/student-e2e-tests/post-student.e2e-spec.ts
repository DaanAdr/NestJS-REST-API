import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { DatabaseService } from '../../../src/database/database.service';
import { CreateStudentDto } from '../../../src/student/dto/create-student.dto';

describe('StudentsController E2E Tests', () => {
  let app: INestApplication;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();   // Creates testing environment

      app = moduleFixture.createNestApplication();
      databaseService = app.get<DatabaseService>(DatabaseService);
      app.useGlobalPipes(new ValidationPipe());     // Use the same validation pipe as main.ts so the auto-validators work
      await app.init();
  });

  beforeEach(async () => {
    // Reset or seed the database before each test
    await resetDatabase();
  });

  // This is an actual test case
  it(`/POST student with valid data creates a new student`, async () => {
    // Arrange
    const payload = new CreateStudentDto;
    payload.name = "Lisa";

    // Act
    const response = await request(app.getHttpServer())
      .post('/student')
      .send(payload)
      .expect(201);

    // Assert
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(payload.name);
  });

  it(`/POST student with empty name returns 400 Bad Request`, async () => {
    // Arrange
    const payload = new CreateStudentDto;
    payload.name = "";

    // Act
    const response = await request(app.getHttpServer())
      .post('/student')
      .send(payload)
      .expect(400);
  });

  it(`/POST student with non-alphabetic name returns 400 Bad Request`, async () => {
    // Arrange
    const payload = new CreateStudentDto;
    payload.name = "Th0m4s";

    // Act
    const response = await request(app.getHttpServer())
      .post('/student')
      .send(payload)
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });

  async function resetDatabase() {
    // Clear all data from the database
    await databaseService.student.deleteMany(); 
  }
});
