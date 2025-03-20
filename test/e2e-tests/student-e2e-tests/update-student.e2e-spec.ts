import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { DatabaseService } from '../../../src/database/database.service';
import { CreateStudentDto } from '../../../src/student/dto/create-student.dto';
import { UpdateStudentDto } from '../../../src/student/dto/update-student.dto';

describe('StudentsController E2E Tests', () => {
  let app: INestApplication;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile(); // Creates testing environment

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
  it(`/PATCH student`, async () => {
    // Arrange
    const student = new CreateStudentDto();
    student.name = 'NIgel';

    let createdStudent = await databaseService.student.create({
      data: student,
    });

    let idToUpdate = createdStudent.id;

    let updatedStudent = new UpdateStudentDto();
    updatedStudent.name = 'Nigel Young';

    // Act
    const response = await request(app.getHttpServer())
      .patch(`/student/${idToUpdate}`)
      .send(updatedStudent)
      .expect(200);

    // Assert
    expect(response.body.id).toBe(idToUpdate);
    expect(response.body.name).toBe(updatedStudent.name);
  });

  it(`/PATCH student with empty name returns 400 Bad Request`, async () => {
    // Arrange
    const student = new CreateStudentDto();
    student.name = 'Ben Thorn';

    let createdStudent = await databaseService.student.create({
      data: student,
    });

    let idToUpdate = createdStudent.id;

    let updatedStudent = new UpdateStudentDto();
    updatedStudent.name = '';

    // Act
    const response = await request(app.getHttpServer())
      .patch(`/student/${idToUpdate}`)
      .send(updatedStudent)
      .expect(400);
  });

  it(`/PATCH student with non-alphabetic name returns 400 Bad Request`, async () => {
    // Arrange
    const student = new CreateStudentDto();
    student.name = 'Jacob';

    let createdStudent = await databaseService.student.create({
      data: student,
    });

    let idToUpdate = createdStudent.id;

    let updatedStudent = new UpdateStudentDto();
    updatedStudent.name = 'J4c0b';

    // Act
    const response = await request(app.getHttpServer())
      .patch(`/student/${idToUpdate}`)
      .send(updatedStudent)
      .expect(400);
  });

  it(`/PATCH student with invalid id return 404 Not Found`, async () => {
    // Arrange
    let idToUpdate = 1450

    let updatedStudent = new UpdateStudentDto();
    updatedStudent.name = 'Nigel Young';

    // Act
    const response = await request(app.getHttpServer())
      .patch(`/student/${idToUpdate}`)
      .send(updatedStudent)
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
