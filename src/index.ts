import express from 'express'
import { rateLimit } from 'express-rate-limit'
import path from 'path'
import 'dotenv/config'

import TodosRouter from './router/todos'
import ViewsRouter from './router/views'

const app = express()

const limiter = rateLimit({
  windowMs: +process.env.RATE_LIMIT_TIME! || 600000,
  limit: +process.env.RATE_LIMIT_COUNT! || 100
})

app.use(limiter)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use('/', ViewsRouter)
app.use('/api/v1/todos', TodosRouter)

app.listen(process.env.PORT || 8000, () => console.log('server is up'))
