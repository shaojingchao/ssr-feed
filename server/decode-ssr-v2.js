const axios = require('axios')
const crypt = require('crypto-js')
const base64 = require('../lib/js-base64')
const getSSRData = require('./get-ssr-data')

function aesDecrypt (t, e) {
  var r = crypt.enc.Utf8.parse(e)
    , n = crypt.AES.decrypt(t, r, {
    mode: crypt.mode.ECB,
    padding: crypt.pad.Pkcs7
  })
  return crypt.enc.Utf8.stringify(n).toString()
}

let cacheResult = ''
let fetching = false
module.exports = function decode (req, res, next) {
  if (cacheResult) {
    res.send(cacheResult)
  }
  if (fetching) return
  fetching = true
  getSSRData().then(data => {
    fetching = false
    let list = []
    let result = ''
    let rawArr = data.ssrInfo.ssrs.split('2022')
    try {
      list = JSON.parse(aesDecrypt(rawArr[0], base64.decode(rawArr[1])))
    } catch (err) {
      if (!cacheResult) {
        next(err)
      }
    }
    list.forEach((item) => {
        result += item.url + '\n'
      }
    )
    let resResult = base64.encode(result)
    if (!cacheResult) {
      res.send(resResult)
    }
    console.log('缓存已更新!')
    cacheResult = resResult
  }).catch(err => {
    fetching = false
    if (!cacheResult) {
      next(err)
    }
  })
}
