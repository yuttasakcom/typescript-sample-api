import { Service } from 'typedi'

import { NotFound } from '../errors/notFound'

export type Todo = {
  id: string
  title: string
}

@Service()
export class TodoService {
  private todo: Todo[] = []

  public create(todo: Todo) {
    this.todo.push(todo)
    return todo
  }

  public get(): Todo[] {
    return this.todo
  }

  public getById(id: string) {
    const todo = this.todo.find((t) => t.id === id)
    if (!todo) {
      throw new NotFound(`Not found todo id:${id}`)
    }
    return todo
  }
}
