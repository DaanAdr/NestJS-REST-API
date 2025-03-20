import { IsInt, IsNotEmpty, Matches } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]*$/, { message: 'Name must only contain letters and spaces' })
    name: string

    @IsNotEmpty()
    @IsInt()
    teacherId: number
}
