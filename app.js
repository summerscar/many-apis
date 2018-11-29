const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const logger = require('./log')
const cors = require('koa2-cors');

const controller = require('./controller');

// error handler
onerror(app)

//跨域配置
app.use(cors());

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.request.method} ${ctx.request.url} ${ms}ms origin: ${ctx.request.header.origin || '直接访问' }`)
})

// routes
let getController = controller()
app.use(getController.routes(), getController.allowedMethods())

module.exports = app
