import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StudentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.databaseService.student.create({
      data: createStudentDto
    });
  }

  async findAll() {
    return this.databaseService.student.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.student.findUnique({
      where: {
        id,     // The comma indicates the value has the same name as the key
      }
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.databaseService.student.update({
      where: {
        id,
      },
      data: updateStudentDto
    });
  }

  async remove(id: number) {
    return this.databaseService.student.delete({
      where: {
        id,     // The comma indicates the value has the same name as the key
      }
    });
  }
}
