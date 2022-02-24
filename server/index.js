// const fs = require('fs')
// const path = require('path')
// const cron = require('node-cron')
const express = require('express')
const bodyParser = require('body-parser')
const decodeSSR = require('./decode-ssr')
const app = express()
const {clientErrorHandler, errorHandler} = require('./error-handler')

app.use(bodyParser.text({
  verify (req, res, buf, encoding) {
    req.rawBody = buf.toString()
  }
}))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/ssr-feed', decodeSSR)

app.use('*', (req, res) => res.status(404).json({
  code: 1,
  msg: '接口不存在'
}))

app.use(clientErrorHandler)

const port = 3000
app.listen(port, () => {
  /**
   * 服务启动成功后，执行任务计划，每天 03:00 执行 process.exit(1)
   * 触发 pm2 重启程序
   */
  // const crontask = '0 19 * * *'
  // cron.schedule(crontask, () => {
  //   console.log(`cron task ${crontask}`)
  //   process.exit(1)
  // })
  console.log(`listening at ${port}!`)
})
