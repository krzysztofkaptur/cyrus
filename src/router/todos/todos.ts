import { Router } from 'express'

import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodos,
  updateTodo
} from '../../controllers/todos/todos'

const todosRouter = Router()

todosRouter.get('/', fetchTodos)
todosRouter.get('/:id', fetchTodo)
todosRouter.patch('/:id', updateTodo)
todosRouter.delete('/:id', deleteTodo)
todosRouter.post('/', createTodo)

export { todosRouter }
