import { IsNotEmpty, Matches } from "class-validator";

export class CreateStudentDto {
    @Matches(/^[a-zA-Z\s]*$/, { message: 'Name must only contain letters and spaces' })
    @IsNotEmpty()
    name: string
}
