import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { DatabaseService } from '../../../src/database/database.service';
import { CreateStudentDto } from '../../../src/student/dto/create-student.dto';
import { GetStudentDto } from '../../../src/student/dto/get-student.dto';

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
      await app.init();
  });

  beforeEach(async () => {
    // Reset or seed the database before each test
    await resetDatabase();
  });

  // This is an actual test case
  it(`/DELETE student`, async () => {
    // Arrange
    const student = new CreateStudentDto;
    student.name = "John";

    let createdStudent = await databaseService.student.create({
        data: student
      });
    
    let idToRemove = createdStudent.id;

    // Act
    const response = await request(app.getHttpServer())
      .delete(`/student/${idToRemove}`)
      .expect(200);
  });

  it(`/DELETE student with invalid id returns 404 Not Found`, async () => {
    // Arrange
    let idToRemove = 756;

    // Act
    const response = await request(app.getHttpServer())
      .delete(`/student/${idToRemove}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });

  async function resetDatabase() {
    // Clear all data from the database
    await databaseService.student.deleteMany(); 
  }
});
