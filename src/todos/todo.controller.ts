import { v1 as uuidv1 } from 'uuid'
import { Controller, Get, Post, Body, Param } from 'routing-controllers'
import { TodoDto } from './todo.dto'
import { TodoService, Todo } from './todo.service'

@Controller('/todos')
export class TodoController {
  constructor(private service: TodoService) {}

  @Get()
  get(): Todo[] {
    return this.service.get()
  }

  @Get('/:id')
  getById(@Param('id') id: string): Todo {
    return this.service.getById(id)
  }

  @Post()
  create(@Body() todoDto: TodoDto): Todo {
    const { title } = todoDto
    const todo: Todo = { id: uuidv1(), title }
    this.service.create(todo)
    return todo
  }
}
