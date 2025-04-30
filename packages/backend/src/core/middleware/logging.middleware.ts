import { Request, Response, NextFunction } from 'express'
import { logger } from '../logger'

export default function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info(
      `Method: ${req.method}, URL: ${req.originalUrl}, Status: ${res.statusCode}, Duration: ${duration}ms`
    )
  })

  next()
}
