import log4js from 'log4js'
const logger = log4js.getLogger()
logger.level = log4js.levels.ALL


const loggerWithTag = (tag) => {
  return (info) => {
    logger.info(`${tag}-${info}`)
  }
}

export {
  logger,
  loggerWithTag
}

