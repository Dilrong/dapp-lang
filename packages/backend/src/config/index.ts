import dotenv from 'dotenv'
dotenv.config()

// TODO: 환경별 분리 - https://devblog.croquis.com/ko/2020-02-15-1-configuration-in-typescript/
export default {
  // BASE
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  DB: {
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE
  },
  LOG: {
    DEFAULT_LEVEL: 'info',
    CONSOLE_LEVEL: 'info',
    FILE_ACTIVE: true
  },

  // CUSTOM
  OPEN_ROUTER_KEY: process.env.OPEN_ROUTER_KEY
}
