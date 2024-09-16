import express from 'express'
import { rateLimit } from 'express-rate-limit'
import 'dotenv/config'

import { todosRouter, viewsRouter, usersRouter } from './router'

const app = express()

const limiter = rateLimit({
  windowMs: +process.env.RATE_LIMIT_TIME! || 600000,
  limit: +process.env.RATE_LIMIT_COUNT! || 100
})

app.use(limiter)

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use('/', viewsRouter)
app.use('/api/v1/todos', todosRouter)
app.use('/api/v1/users', usersRouter)

app.listen(process.env.PORT || 8000, () => console.log('server is up'))
