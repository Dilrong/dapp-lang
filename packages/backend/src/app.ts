import express from 'express'

import indexRouter from './routes/index'
import v1Router from './routes/v1'
import env from './config'
import logMiddleware from './core/middleware/logging.middleware'

const app = express()

app.use(logMiddleware)
app.use(express.json())

// Router
app.use('/', indexRouter)
app.use('/', v1Router)

app.listen(env.PORT, () => {
  console.log(`App Listening on port ${env.PORT}`)
})
