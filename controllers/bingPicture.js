const request = require('request-promise')

let bingPicture = async (ctx, next) => {
    let ret = await request('https://api.asilu.com/bg/')
    ctx.body = ret
  }

module.exports = {'GET /bingPicture': bingPicture }