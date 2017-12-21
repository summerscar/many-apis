const request = require('request-promise')
const log4js = require('../log')

const logger = log4js.getLogger('api');
logger.level = 'all';

let getIPLocal = async (ctx, next) => {
    let ret = await request(`http://ip.taobao.com/service/getIpInfo.php?ip=${ctx.query.ip}`)
    logger.info(`GET /getIPLocal 被调用 origin: ${ctx.request.header.origin || '直接访问'}`)
    ctx.body = ret
  }

module.exports = {'GET /getIPLocal': getIPLocal }