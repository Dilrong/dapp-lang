import express from 'express'
import cors from 'cors'

import indexRouter from './routes/index'
import v1Router from './routes/v1'
import env from './config'
import logMiddleware from './core/middleware/logging.middleware'
import { logger } from './core/logger'

const app = express()

app.use(logMiddleware)
app.use(express.json())
app.use(
  cors({
    origin: '*'
  })
)

// Router
app.use('/', indexRouter)
app.use('/', v1Router)

const startServer = async () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`App Listening on port ${env.PORT}`)
    })
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

startServer()
