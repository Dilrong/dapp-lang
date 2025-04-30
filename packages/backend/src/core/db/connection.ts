import { DataSource } from 'typeorm'
import env from '../../config'
import path from 'path'
import { logger } from '../logger'

const ENV = env.DB

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: ENV.HOST,
  database: ENV.NAME,
  port: parseInt(ENV.PORT),
  username: ENV.USER,
  password: ENV.PASSWORD,
  synchronize: !!ENV.DB_SYNCHRONIZE,
  entities: [path.join(__dirname, 'entities', '*.ts')]
})

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize()
    logger.info('Database connected successfully')
  } catch (error) {
    logger.error('Error connecting to database:', error)
    throw error
  }
}
