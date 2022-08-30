// import { http, httpForm } from '@/utils/request.js'
import {requestProxy, http, httpForm} from './request.js'

// 获取远端选项信息
export function getRemoteOptions(params) {
  return http.get(
    '/jqcm/options.php',
    {params}
  )
}

// 获取更新信息
export function getUpdate(params) {
  return http.get(
    '/jqcm/update.php',
    {params}
  )
}

// 获取角色信息
export function getRoleInfo(params) {
  return http.get(
    '/jqcm/get_role_info.php',
    {params}
  )
}

// 获取配置信息
export function getConfigInfo(params) {
  return http.get(
    '/jqcm/get_role_settings.php',
    {params}
  )
}

// 修改配置信息
export function changeConfigInfo(data) {
  return httpForm.post(
    '/jqcm/change_settings.php',
    data
  )
}

export function getDescription(params) {
  return http.get(
    '/jqcm/description.php',
    {params}
  )
}

export function getHelp(params) {
  return http.get(
    '/jqcm/help_info.php',
    {params}
  )
}

export function getGonglue(params) {
  return http.get(
    '/jqcm/gonglue.php',
    {params}
  )
}

export function startGuaji(params) {
  return http.get(
    '/jqcm/start.php',
    {params}
  )
}

export function stopGuaji(params) {
  return http.get(
    '/jqcm/stop.php',
    {params}
  )
}

export function getUtils(params) {
  return http.get(
    '/jqcm/utils.php',
    {params}
  )
}

export function getIntUserid(params) {
  return http.get(
    '/jqcm/get_int_uid.php',
    {params}
  )
}

export function getStrUserid(params) {
  return http.get(
    '/jqcm/get_str_uid.php',
    {params}
  )
}

// 转移时间
export function transferTime(data) {
  return httpForm.post(
    '/jqcm/transfer_time.php',
    data
  )
}

// 游戏反馈
export function feedback(data) {
  return httpForm.post(
    '/jqcm/feedback.php',
    data
  )
}

// 新用户登录，添加到辅助后台
export function addUser(data) {
  return httpForm.post(
    '/jqcm/add_user.php',
    data
  )
}

export function checkUserStatus(params) {
  return http.get(
    '/jqcm/check_user.php',
    {params}
  )
}

// 通过自己写的proxy登录二步获取用户token
export function loginSecondStepByProxy(params) {
  return http.getSecondStepByProxy(
    '/jqcm_proxy.php',
    {params}
  )
}

// 飞仙诀羔羊游登录
export function loginFirstStepFeixianjueGYY(data) {
  return httpForm.postGYY(
    '/util/gaoyangyouLogin.py',
    data
  )
}

// 飞仙诀饺子手游游登录
export function loginFirstStepFeixianjueJiaozishouyou(data) {
  return httpForm.postGYY(
    '/util/jiaozishouyouLogin.py',
    data
  )
}

// 饺子手游剑气除魔H5登录
export function loginFirstStepJiaozishouyouH5(data) {
  return httpForm.postGYY(
    '/util/jiaozishouyouH5Login.py',
    data
  )
}

// 饺子手游修真归来
export function loginFirstStepJiaozishouyouXzgl(data) {
  return httpForm.postGYY(
    '/util/jiaozishouyouXzglLogin.py',
    data
  )
}

// 冰狐游戏登录
export function loginFirstStepBinghuyouxi(data) {
  return httpForm.postGYY(
    '/util/bhyxLogin.py',
    data
  )
}

// 3011登录
export function loginFirstStep3011(data) {
  return httpForm.postGYY(
    '/util/3011Login.py',
    data
  )
}

// 游戏鸭登录
export function loginFirstStepYXY(data) {
  return httpForm.postGYY(
    '/util/yxyLogin.py',
    data
  )
}

// 游戏鸭神之六面登录
export function loginFirstStepYXYSzlm(data) {
  return httpForm.postGYY(
    '/util/yxySzlmh5Login.py',
    data
  )
}

// 游戏鸭剑气除魔文字修真登录
export function loginFirstStepYXYJqcmWzxz(data) {
  return httpForm.postGYY(
    '/util/yxyJqcmwzxzLogin.py',
    data
  )
}

// 3011剑气除魔文字修真登录
export function loginFirstStep3011JqcmWzxz(data) {
  return httpForm.postGYY(
    '/util/3011JqcmWxxzLogin.py',
    data
  )
}

// 3011剑气除魔文字修真登录
export function loginFirstStepBatu(data) {
  return httpForm.postGYY(
    '/util/batuLogin.py',
    data
  )
}

// 饺子手游剑气除魔文字修真登录
export function loginFirstStepJzsyJqcmWzxz(data) {
  return httpForm.postGYY(
    '/util/jzsyJqcmCwzxz.py',
    data
  )
}

// 傲剑苍穹通过python登录
export function loginFirstStepAjcq(data) {
  return httpForm.postGYY(
    '/util/aojiancangqiongLogin.py',
    data
  )
}

// 修仙霸业通过python登录
export function loginFirstStepXXBY(data) {
  return httpForm.postGYY(
    '/util/xiuxianbayeLogin.py',
    data
  )
}

// 万古至尊通过python登录
export function loginWgzz(data) {
  return httpForm.postGYY(
    '/util/wgzzLogin.py',
    data
  )
}

// 咪噜通过python登录
export function loginFirstStepMilu(data) {
  return httpForm.postGYY(
    '/util/miluCwzxz.py',
    data
  )
}


// 羔羊游剑气除魔文字修真登录
export function loginFirstStepGyyJqcmWzxz(data) {
  return httpForm.postGYY(
    '/util/gyyJqcmCwzxz.py',
    data
  )
}

// 无尽修炼2登录
export function loginFirstStepWjxl2Direct(data) {
  return httpForm.postGYY(
    '/util/wjxl2Login.py',
    data
  )
}

// 剑气除魔H5-3011
export function loginFirstStep3011JqcmH5(data) {
  return httpForm.postGYY(
    '/util/3011JqcmH5Login.py',
    data
  )
}

// 冰火游戏
export function loginFirstStepBingHuo(data) {
  return httpForm.postGYY(
    '/util/bhJqcmLogin.py',
    data
  )
}

// 五岳乾坤
export function loginFirstStepWyqk(data) {
  return httpForm.postGYY(
    '/util/wyqkLogin.py',
    data
  )
}


// 登录一步
export function loginFirstStep(data) {
  return http.post(
    'http://center.wscbwh.cn/api/login',
    data
  )
}

// 无尽修炼2登录一步
export function loginFirstStepWJXL2(data) {
  return http.post(
    'http://center.youxirs.com/api/login',
    data
  )
}

// 道友渡劫不登录第一步
export function loginFirstStepDYDJB(data, header) {
  return httpForm.post(
    'http://www.fzsyouxi.com/api/authorizations',
    // 'http://m.huojiangame.com:9080/jqcm_login_dydjb/api/authorizations',
    data,
    {header}
  )
}

// 道友渡劫不登录第二步
export function loginSecondStepDYDJB(params, header) {
  return http.get(
    'http://www.fzsyouxi.com/api/user',
    // 'http://m.huojiangame.com:9080/jqcm_login_dydjb/api/user',
    {params, header}
  )
}
