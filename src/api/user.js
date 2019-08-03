import mpx from '@mpxjs/core'
import API from './api'

class User extends API {
  // 非授权微信登录
  login (userInfo = null) {
    // 微信登录
    return mpx.login()
      .then((res) => {
        let p = {
          userInfo,
          code: res.code
        }

        // 用code登录到我们自己的服务器，并获取登录token。
        return this.post(`user/wechat/login`, p)
      })
      .then((res) => {
        // 设置 token
        this.bearer(res)
      })
  }

  // 授权微信登录
  loginAuth () {
    // 微信登录
    return mpx.getUserInfo()
      .then((res) => {
        let userInfo = res.userInfo
        return this.login(userInfo)
      })
  }

  // 微信登录
  getUser () {
    // 微信登录
    return this.get(`user`)
      .then((res) => {
        // 设置 token
        console.log('getUser', res.data)
        return res.data
      })
  }

  // Bearer授权
  bearer (token) {
    this.config().headers.Authorization = `Bearer ${token}`
    console.log('login', token)
  }
}

export default new User()
