import { IsNotEmpty, IsIn } from 'class-validator'

export enum TodoStatus {
  DONE = 'DONE',
  DOING = 'DOING',
}
export class TodoDto {
  @IsNotEmpty()
  title!: string

  @IsNotEmpty()
  @IsIn([TodoStatus.DONE, TodoStatus.DOING])
  status!: TodoStatus
}
