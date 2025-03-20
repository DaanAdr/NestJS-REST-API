import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { DatabaseService } from '../database/database.service';
import { GetCourseDto } from './dto/get-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCourseDto: CreateCourseDto) {
    const createdCourse = await this.databaseService.course.create({
      data: createCourseDto,
      include: {
        teacher: true
      }
    });

    var response = new GetCourseDto;
    response.id = createdCourse.id;
    response.course_name = createdCourse.name;
    response.teacher_name = createdCourse.teacher.name;

    return response;
  }

  async findAll() {
    const courses = await this.databaseService.course.findMany({
      include: {
        teacher: true
      }
    });

    return courses.map(course => ({
      id: course.id,
      course_name: course.name,
      teacher_name: course.teacher.name
    } as GetCourseDto));
  }
}
