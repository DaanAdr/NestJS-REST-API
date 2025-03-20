import { IsInt, IsNotEmpty } from "class-validator";

export class CreateStudentCourseDto {
    @IsNotEmpty()
    @IsInt()
    studentId: number

    @IsNotEmpty()
    @IsInt()
    courseId: number
}
