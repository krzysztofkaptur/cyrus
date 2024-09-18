import 'dotenv/config'

import { createServer } from './utils/server'

const app = createServer()

app.listen(process.env.PORT || 8000, () => console.log('server is up'))
