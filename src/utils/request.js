/**
 * 封装 axios
 */

import axios from 'axios'

// 创建一个单例（实例）
const instance = axios.create({
  // baseURL: '/apis',
  timeout: 1000 * 4
})

// 拦截器 - 请求拦截
instance.interceptors.request.use(
  config => {
    /**
     * 根据需求作处理
     */
    // 部分接口需要拿到 token
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截器 - 响应拦截
instance.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance
