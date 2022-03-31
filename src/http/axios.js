import axios from 'axios'
import { ElMessage } from 'element-plus'
//axios配置
// axios.defaults.timeout = 5000
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8'

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// POST传参序列化
axios.interceptors.request.use(
  (config) => {
    // 单个网站的admin用户
    // config.headers.common['Gw-Admin-Access-Token'] =
    //   store.getters.adminAccessToken
    // 整个网点user
    // config.headers.common['Gw-User-Access-Token'] =
    //   store.getters.userAccessToken
    return config
  },
  (err) => {
    ElMessage.error('参数错误')
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (res) => {
    const response = res.data
    if (response.msg) {
      if (response.code === 0) {
        ElMessage.success(response.msg)
      } else {
        ElMessage.error(response.msg)
      }
    }
    return response
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          ElMessage.error('未授权，请登录')
          window.location.href = '/#/auth/login'
          break
        case 404:
          ElMessage.error(
            '接口请求异常: ' + err.response.config.url + ', 请重试'
          )
          break
        default:
          ElMessage.error('Oops, 出错啦')
      }
    }
    return Promise.reject(err)
  }
)

function request(method, url, data) {
  // 处理请求的url和数据
  data = method === 'get' ? { params: data } : data
  // 发送请求
  return new Promise((resolve, reject) => {
    axios[method](url, data)
      .then(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error)
      })
  }).catch((error) => {
    console.log(error)
  })
}
export { request }
