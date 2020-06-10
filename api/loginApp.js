import { http } from '@/utils/request.js'

// 登录一步,在app上不需要代理
export function loginFirstStep(data) {
  return http.post(
    'http://center.wscbwh.cn/api/login',
    data
  )
}

// 登录二步获取用户token,在app上不需要代理
export function loginSecondStep(params) {
  return http.get(
    'http://ufo.66hjh.com/user/v1/token',
    {params}
  )
}

// 无尽修炼2登录一步,在app上不需要代理
export function loginFirstStepWJXL2(data) {
  return http.post(
    'http://center.youxirs.com/api/login',
    data
  )
}