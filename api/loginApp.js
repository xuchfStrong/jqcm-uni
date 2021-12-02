// import { http, httpForm } from '@/utils/request.js'
import {requestProxy, http, httpForm} from './request.js'

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
    // 'http://ufo.66hjh.com/user/v1/token',
		'http://gw.begindcc.com/ufo/api/6/user/token',
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

// 神道登录第一步
export function loginFirstStepShendao(params) {
  return http.get(
    'http://api.1017sy.cn/index.php',
    {params}
  )
}

// 道友渡劫不登录第一步
export function loginFirstStepDYDJB(data, header) {
  console.log('道友渡劫不3')
  return httpForm.post(
    'http://www.fzsyouxi.com/api/authorizations',
    data,
    {header}
  )
}

// 道友渡劫不登录第二步
export function loginSecondStepDYDJB(params, header) {
  return http.get(
    'http://www.fzsyouxi.com/api/user',
    {params, header}
  )
}

// 江湖传说登录第三步
export function loginThirdStepJHCS(params) {
  return http.get(
    'https://gw.begindcc.com/ufo/api/6/user/token',
    {params}
  )
}
