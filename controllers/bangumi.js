const request = require('request-promise')
const cheerio = require('cheerio')

let bangumi = async (ctx, next) => {
    let ret = await request(encodeURI('http://www.zimuxia.cn/portfolio/' + ctx.params.title))
    const $ = cheerio.load(ret)
    let links = $('div.content-box a')
    let data = Array.from(links)
    .filter(item => item.attribs && item.attribs.href.indexOf('ed2k:') === 0)
    .map(item => ({title: decodeURIComponent(item.attribs.href.split('|')[2]), link: item.attribs.href}))
    ctx.body = data
  }

module.exports = {'GET /bangumi/:title': bangumi, 'example': '/bangumi/无法成为野兽的我们' }