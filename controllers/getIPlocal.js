const request = require('request-promise')

let getIPLocal = async (ctx, next) => {
    let ret = await request(`http://ip.taobao.com/service/getIpInfo.php?ip=${ctx.params.ip}`)
    ctx.body = ret
  }

module.exports = {'GET /getIPLocal/:ip': getIPLocal }