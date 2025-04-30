import { createLogger, format, Logger, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import * as Transport from 'winston-transport'
import env from '../../config'

const ENV = env.LOG

const logFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.ms(),
  format.errors({ stack: true }),
  format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message || ''} ${info.stack || ''}`
  })
)

const transportList: Transport[] = [
  new transports.Console({
    level: ENV.CONSOLE_LEVEL,
    format: logFormat
  })
]

if (ENV.FILE_ACTIVE) {
  transportList.push(
    new DailyRotateFile({
      level: 'error',
      datePattern: 'YYYYMMDD',
      dirname: './logs',
      filename: 'error.%DATE%.log',
      maxSize: `10m`,
      maxFiles: `30d`,
      format: logFormat
    })
  )
}

const logger: Logger = createLogger({
  level: ENV.DEFAULT_LEVEL,
  format: logFormat,
  transports: transportList
})

export { logger }
