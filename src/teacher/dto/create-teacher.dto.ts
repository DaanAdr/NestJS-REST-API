import { IsNotEmpty, Matches } from "class-validator";

export class CreateTeacherDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]*$/, { message: 'Name must only contain letters and spaces' })
    name: string
}
