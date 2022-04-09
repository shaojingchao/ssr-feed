const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cron = require('node-cron')
const express = require('express')
const bodyParser = require('body-parser')
const decodeSSR = require('./decode-ssr')
const decodeSSRV2 = require('./decode-ssr-v2')
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

app.get('/pm2', (req, res, next) => {
  // res.send(fs.readFileSync('./pm2.html'))
  res.sendFile(path.join(__dirname, './pm2.html'))
})
app.get('/v2/ssr-feed', decodeSSRV2)

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
  let crontask = `${Math.ceil(Math.random() * 60)} */6 * * *`
  cron.schedule(crontask, () => {
    console.log(crontask)
    axios.get('http://localhost:3000/v2/ssr-feed').then(res => {})
  })
  console.log(`listening at ${port}!`)
})
