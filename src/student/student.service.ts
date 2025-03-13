import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import { GetStudentDto } from './dto/get-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStudentDto: CreateStudentDto) {
    const createdUser = await this.databaseService.student.create({
      data: createStudentDto
    });

    var response = new GetStudentDto();
    response.id = createdUser.id;
    response.name = createdUser.name;

    return response;
  }

  async findAll() : Promise<GetStudentDto[]>
  {
    const students = await this.databaseService.student.findMany();   // Const variables value can't change after declaration

    return students.map(student => ({
      id: student.id,
      name: student.name
    } as GetStudentDto));       // You can also create and return a new GetStudentDto in the map arrow-function function
  }

  async findOne(id: number) {
    const foundStudent = await this.databaseService.student.findUnique({
      where: {
          id, // The comma indicates the value has the same name as the key
      }
    });

    if (!foundStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    var response = new GetStudentDto();
    response.id = foundStudent.id;
    response.name = foundStudent.name;

    return response;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    // Try to find the student by ID
    const foundStudent = await this.databaseService.student.findUnique({
      where: {
        id,
      },
    });

    // If the student does not exist, you can throw a NotFoundException
    if (!foundStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    // Update the found student
    const updatedStudent = await this.databaseService.student.update({
      where: {
        id,
      },
      data: updateStudentDto
    });

    var response = new GetStudentDto();
    response.id = updatedStudent.id;
    response.name = updatedStudent.name;

    return response;    // Consider returning true, as the system that requested the update already has the data
  }

  async remove(id: number) {
    // Try to find the student by ID
    const foundStudent = await this.databaseService.student.findUnique({
      where: {
        id,
      },
    });

    // If the student does not exist, you can throw a NotFoundException
    if (!foundStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    await this.databaseService.student.delete({
      where: {
        id,     // The comma indicates the value has the same name as the key
      }
    });

    return true;
  }
}
