import { Router } from 'express'
import {
  fetchUsers,
  fetchUser,
  deleteUser,
  createUser,
  updateUser
} from '../../controllers/users'

const usersRouter = Router()

usersRouter.get('/', fetchUsers)
usersRouter.get('/:id', fetchUser)
usersRouter.patch('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)
usersRouter.post('/', createUser)

export { usersRouter }
