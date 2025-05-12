import dotenv from 'dotenv'
dotenv.config()

// TODO: 환경별 분리 - https://devblog.croquis.com/ko/2020-02-15-1-configuration-in-typescript/
export default {
  // BASE
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  LOG: {
    DEFAULT_LEVEL: 'info',
    CONSOLE_LEVEL: 'info',
    FILE_ACTIVE: true
  },

  // CUSTOM
  OPEN_ROUTER_KEY: process.env.OPEN_ROUTER_KEY
}
