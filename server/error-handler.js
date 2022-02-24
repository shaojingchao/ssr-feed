/**
 * @author cjs
 * @date 2021/11/20 22:22
 * @project node-echarts-api
 * @description
 */

exports.clientErrorHandler = function clientErrorHandler (err, req, res, next) {
  res.status(500).send({
    code: 1,
    msg: err.message || 'internal error',
    err: err.stack || 'no stack'
  })
}

exports.errorHandler = function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', {error: err})
}
