
import mpx from '@mpxjs/core'

class API {
  constructor () {
    ['delete', 'get', 'head', 'options', 'trace', 'post', 'put', 'patch'].forEach((method) => {
      API.prototype[method] = function (url, data, config) {
        return this.request({
          ...config,
          method,
          url,
          data
        })
      }
    })
  }

  // 获取配置
  config () {
    return API._config.default
  }

  // 网络请求
  request (options) {
    wx.showNavigationBarLoading()

    //  console.log('request', options)
    return mpx.request({
      ...options,
      url: `${options.baseURL || this.config().baseURL}${options.url}`,
      header: {
        ...(this.config().headers)
      },
      complete: function () {
        options.complete && options.complete()
        wx.hideNavigationBarLoading()
      }
    }).then((res) => {
      switch (res.statusCode) {
        case 200:
          return res.data
        default:
          console.warn(API.statusCode[res.statusCode])
          throw res
      }
    })
  }
}

// 默认请求配置
API._config = {
  default: {
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
      'Authorization': ''
      // 'Accept': 'application/json, text/plain, */*',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // 'Content-type': 'application/json',
    }
  }
}

API.statusCode = {
  200: '正常请求',
  401: '未登陆',
  403: '未授权接口',
  500: '服务器出错',
  502: '服务器出错',
  503: '哦～服务器宕机了'
}

export default API
