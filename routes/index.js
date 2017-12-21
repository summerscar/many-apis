const router = require('koa-router')()
const request = require('request-promise')

router.get('/bingPicture', async (ctx, next) => {
  let ret = await request('https://api.asilu.com/bg/')
  ctx.body = ret
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
