import { Router } from 'express'

import TodosController from '../../controllers/todos'

const todosRouter = Router()

todosRouter.get('/', TodosController.fetchAll)
todosRouter.get('/:id', TodosController.fetchById)
todosRouter.patch('/:id', TodosController.update)
todosRouter.delete('/:id', TodosController.delete)
todosRouter.post('/', TodosController.create)

export { todosRouter }
