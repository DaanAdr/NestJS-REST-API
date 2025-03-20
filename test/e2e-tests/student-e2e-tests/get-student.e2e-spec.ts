import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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
      await app.init();
  });

  beforeEach(async () => {
    // Reset or seed the database before each test
    await resetDatabase();

    // Seed
    const studentOne = new CreateStudentDto;
    studentOne.name = "Markus";

    const studentTwo = new CreateStudentDto;
    studentTwo.name = "Elias";

    await databaseService.student.createMany({
      data: [studentOne, studentTwo]
    })
  });

  // This is an actual test case
  it(`/GET student`, async () => {
    // Arrange
    const expectedNames = ['Markus', 'Elias'];

    // Act
    const response = await request(app.getHttpServer())
      .get('/student')
      .expect(200);

    // Assert
    const returnedNames = response.body.map(student => student.name);
    expect(returnedNames).toEqual(expect.arrayContaining(expectedNames));
  });

  afterAll(async () => {
    await app.close();
  });

  async function resetDatabase() {
    // Clear all data from the database
    await databaseService.student.deleteMany(); 
  }
});
