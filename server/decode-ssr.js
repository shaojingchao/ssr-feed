const axios = require('axios')
const crypt = require('crypto-js')
const base64 = require('../lib/js-base64')

// const data = require('./data.json')
function aesDecrypt (t, e) {
  var r = crypt.enc.Utf8.parse(e)
    , n = crypt.AES.decrypt(t, r, {
    mode: crypt.mode.ECB,
    padding: crypt.pad.Pkcs7
  })
  return crypt.enc.Utf8.stringify(n).toString()
}

let cacheResult = ''
module.exports = function decode (req, res) {
  if (cacheResult) {
    res.send(cacheResult)
  }
  return axios.get('https://lncn.org/api/ssr-list').then(resData => {
    console.log(resData)
    const data = resData.data
    let list = []
    let result = ''
    try {
      list = JSON.parse(aesDecrypt(data.ssrs, base64.decode(data.code)))
    } catch (err) {
      console.error('JSON.parse', err)
      // return next(err)
    }
    list.forEach((item) => {
        result += item.url + '\n'
      }
    )
    
    let resResult = base64.encode(result)
    if (!cacheResult) {
      res.send(resResult)
    }
    console.log('缓存已更新：', resResult)
    cacheResult = resResult
  }).catch(err => {
    console.log(err)
  })
}
