const axios = require('axios')
// fetch.get('https://lncn.org/api/ssr-list').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
const ssr1 = 'https://lncn.org/api/ssr-list'
const ssr2 = 'https://baidu.com'
const ssr3 = 'https://lncn.org'
axios.get(ssr1).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
