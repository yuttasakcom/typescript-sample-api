import { TodoService } from './todo.service'

export default {
  Query: {
    todo: () => {
      const todoService = new TodoService()
      return todoService.get()
    },
  },
}
