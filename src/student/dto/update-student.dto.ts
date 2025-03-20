import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @Matches(/^[a-zA-Z\s]*$/, { message: 'Name must only contain letters and spaces' })
    @IsNotEmpty()
        name: string
}
