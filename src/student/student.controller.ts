import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiExceptionsFilter } from '../exception-filters/api-exception-filters';

@Controller('student')
@UseFilters(ApiExceptionsFilter)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return await this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentService.remove(+id);
  }
}
