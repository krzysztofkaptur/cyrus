import { Router } from 'express'
import UsersController from '../../controllers/users'

const usersRouter = Router()

usersRouter.get('/', UsersController.fetchAll)
usersRouter.get('/:id', UsersController.fetchById)
usersRouter.patch('/:id', UsersController.update)
usersRouter.delete('/:id', UsersController.delete)
usersRouter.post('/', UsersController.create)

export { usersRouter }
