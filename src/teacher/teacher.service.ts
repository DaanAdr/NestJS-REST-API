import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { DatabaseService } from '../database/database.service';
import { GetTeacherDto } from './dto/get-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const createdTeacher =  await this.databaseService.teacher.create({
      data: createTeacherDto
    });

    const response = new GetTeacherDto;
    response.id = createdTeacher.id;
    response.name = createdTeacher.name;

    return response;
  }

  async findAll() {
    const teachers = await this.databaseService.teacher.findMany();

    return teachers.map(teacher => ({
          id: teacher.id,
          name: teacher.name
        } as GetTeacherDto)); 
  }
}
