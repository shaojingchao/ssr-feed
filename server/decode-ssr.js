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

module.exports = function decode (req, res, next) {
  return axios.get('https://lncn.org/api/ssr-list').then(resData => {
    const data = resData.data
    let list = []
    let result = ''
    try {
      list = JSON.parse(aesDecrypt(data.ssrs, base64.decode(data.code)))
    } catch (err) {
      return next(err)
    }
    list.forEach((item) => {
        result += item.url + '\n'
      }
    )
    res.send(base64.encode(result))
  }).catch(err => {
    next(err)
  })
}
