import { IsAlpha, IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @IsAlpha()
    @IsNotEmpty()
    name: string
}
