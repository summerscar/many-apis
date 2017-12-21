const request = require('request-promise')
const log4js = require('../log')

const logger = log4js.getLogger('api');
logger.level = 'all';

let bingPicture = async (ctx, next) => {
    let ret = await request('https://api.asilu.com/bg/')
    logger.info(`GET /bingPicture 被调用 origin: ${ctx.request.header.origin || '直接访问'}`)
    ctx.body = ret
  }

module.exports = {'GET /bingPicture': bingPicture }