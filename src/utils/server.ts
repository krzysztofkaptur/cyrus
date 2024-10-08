import express, { Request, Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import 'dotenv/config'
import cors from 'cors'

import { todosRouter, usersRouter, testimonialsRouter } from '../router'

export const createServer = () => {
  const app = express()

  const limiter = rateLimit({
    windowMs: +process.env.RATE_LIMIT_TIME! || 600000,
    limit: +process.env.RATE_LIMIT_COUNT! || 100,
  })

  app.use(cors())
  app.use(limiter)

  app.use(express.static('public'))

  app.use(express.json())
  app.use('/api/v1/todos', todosRouter)
  app.use('/api/v1/users', usersRouter)
  app.use('/api/v1/testimonials', testimonialsRouter)
  app.use('/api/v1/healthcheck', (req: Request, res: Response) => {
    return res.json({ message: 'healthcheck' })
  })

  return app
}
