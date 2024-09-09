import { Router } from 'express'

import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodos,
  updateTodo
} from '../../controllers/todos/todos'

const router = Router()

router.get('/', fetchTodos)
router.get('/:id', fetchTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.post('/', createTodo)

export default router
