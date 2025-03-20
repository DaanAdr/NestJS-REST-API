import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';

@Controller('student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Post()
  async create(@Body() createStudentCourseDto: CreateStudentCourseDto) {
    return await this.studentCourseService.create(createStudentCourseDto);
  }
}
