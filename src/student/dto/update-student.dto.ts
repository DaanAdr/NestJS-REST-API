import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @IsAlpha()
    @IsNotEmpty()
        name: string
}
