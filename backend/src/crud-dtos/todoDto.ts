import { IsNotEmpty } from "class-validator";


export class CreateTodoDto {
  content: string;
  @IsNotEmpty()
  userId: string;
  completed: boolean = false;
  status: string = 'PENDING';
}
