import { v1 as uuidv1 } from 'uuid'
import { Controller, Get, Post, Body, Param } from 'routing-controllers'
import { TodoDto } from './todo.dto'
import { NotFound } from '../errors/notFound'

type Todo = {
  id: string
  title: string
}

@Controller('/todos')
export class TodoController {
  private todo: Todo[] = []

  @Get()
  get(): Todo[] {
    return this.todo
  }

  @Get('/:id')
  getById(@Param('id') id: string): Todo {
    const todo = this.todo.find((t) => t.id === id)
    if (!todo) {
      throw new NotFound(`Not found todo id:${id}`)
    }
    return todo
  }

  @Post()
  create(@Body() todoDto: TodoDto): Todo {
    const { title } = todoDto
    const todo: Todo = { id: uuidv1(), title }
    this.todo.push(todo)
    return todo
  }
}
