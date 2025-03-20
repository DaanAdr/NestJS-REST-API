import { Injectable } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class StudentCourseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStudentCourseDto: CreateStudentCourseDto) {
    return await this.databaseService.studentCourse.create({
      data: createStudentCourseDto
    });
  }
}
