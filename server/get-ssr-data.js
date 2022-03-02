const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const ssr1 = 'https://lncn.org/api/ssr-list'
const ssr3 = 'https://lncn.org'
const matchDataRE = /<script><\/script>/
function getHtml () {
  return new Promise((resolve, reject) => {
    fetch("https://lncn.org/", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "__cf_bm=lSoS1LwIz3Z_idgK0f.GT_1Ie7O1_z9klIDZPY3C_vU-1646228637-0-AWs+iOcxCAfYaCh3yHFCUk4HsbEbxdPwzq3JBs3D9mtWSJVmUF4ccG93EQx81xCKEfQgEGjYcH4MT8aSGYU7zCmpRzoMgsFdsGjGerAhuZ9u9CL80dq8SM2RNsaAJiXBCg=="
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
    }).then(res => {
      return res.text()
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  })
}
module.exports = function () {
  return new Promise((resolve, reject) => {
    getHtml().then(html => {
      // console.log('html', html)
      let __NUXT__ = ''
      let result = ''
      const $ = cheerio.load(html)
      $('script').each((index, item) => {
        if (item.children.length && item.children[0].data) {
          __NUXT__ = item.children[0].data
          if (__NUXT__.trim().startsWith('window.__NUXT__')) {
            result = __NUXT__.substring('window.'.length)
          }
        }
      })
      try {
        const data = eval(result).state
        resolve(data)
      } catch (err) {
        reject(err)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
