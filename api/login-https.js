import { http, httpForm } from '@/utils/request.js'

// 登录一步
export function loginFirstStep(data) {
  return http.post(
    'https://m.huojiangame.com:9443/jqcm_login/api/login',
    data
  )
}

// 登录二步获取用户token
export function loginSecondStep(params) {
  return http.get(
    'https://m.huojiangame.com:9443/jqcm_usertoken/user/v1/token',
    {params}
  )
}

// 通过自己写的proxy登录二步获取用户token
export function loginSecondStepByProxy(params) {
  return http.get(
    'http://192.144.211.81:11658/jqcm_proxy.php',
    {params}
  )
}

// 剑气除魔登录第一步
export function loginFirstStepShendao(params) {
  return http.get(
    // 'http://api.1017sy.cn/index.php',
    'https://m.huojiangame.com:9443/login_step1/index.php',
    {params}
  )
}


// 登录第三步
export function loginThirdStep(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index.php',
    {params}
  )
}

// 单机江湖无尽修炼1登录第三步
export function loginThirdStepDDJHWJXL1(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index_ml.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index_ml.php',
    {params}
  )
}


// 无尽修炼2登录一步
export function loginFirstStepWJXL2(data) {
  return http.post(
    'https://m.huojiangame.com:9443/jqcm_login_wjxl2/api/login',
    data
  )
}

// 无尽修炼2登录第三步
export function loginThirdStepWJXL2(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index_hlyx.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index_hlyx.php',
    {params}
  )
}

// 无尽修炼1登录第三步
export function loginThirdStepWJXL(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index_ml.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index_ml.php',
    {params}
  )
}

// 神道登录第三步
export function loginThirdStepShendao(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index_lw.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index_lw.php',
    {params}
  )
}

// TapTap登录第一步
export function loginFirstStepTapTap(data) {
  return httpForm.post(
    // 'http://sdk.66hjh.com/user/login',
    'https://m.huojiangame.com:9443/login_step1_taptap/user/login',
    data
  )
}

// TapTap登录二步获取用户token
// export function loginSecondStepTapTap(params) {
//   return http.get(
//     'http://ufo.66hjh.com/user/v1/token',
//     {params}
//   )
// }

// TapTap登录第三步
export function loginThirdStepTapTap(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index_qudao.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index_qudao.php',
    {params}
  )
}

// 道友渡劫不登录第一步
export function loginFirstStepDYDJB(data, header) {
  return httpForm.post(
    // 'http://www.fzsyouxi.com/api/authorizations',
    'https://m.huojiangame.com:9443/jqcm_login_dydjb/api/authorizations',
    data,
    {header}
  )
}

// 道友渡劫不登录第二步
export function loginSecondStepDYDJB(params, header) {
  return http.get(
    // 'http://www.fzsyouxi.com/api/user',
    'https://m.huojiangame.com:9443/jqcm_login_dydjb/api/user',
    {params, header}
  )
}

// 道友渡劫不登录第三步
export function loginThirdStepDYDJB(params) {
  return http.get(
    // 'http://106.53.178.160:83/game/biguo/index_ww.php',
    'https://m.huojiangame.com:9443/login_step3/game/biguo/index_ww.php',
    {params}
  )
}


// 仙凡传登录第一步
export function loginFirstStepXianfanzhuan(data) {
  return httpForm.post(
    'https://api.cxgame.net/VGXup/on0af',
    data
  )
}

// 仙凡传登录第三步
export function loginThirdStepXianfanzhuan(params) {
  return http.get(
    // 'https://dzzapi.8866net.com/game/biguo/index_xcx.php',
    'https://dzzapi.8866net.com/game/biguo/index_xcx.php',
    {params}
  )
}

// 新用户登录，添加到辅助后台
export function addUser(data) {
  return httpForm.post(
    'https://jqcm.huojiangame.com:11443/jqcm/add_user.php',
    data
  )
}

export function checkUserStatus(params) {
  return http.get(
    'https://jqcm.huojiangame.com:11443/jqcm/check_user.php',
    {params}
  )
}

export function getServerConfig(params) {
  return http.get(
    // 'http://dzztest.8866net.com:83/www/api/server_config.php',
    'https://m.huojiangame.com:9443/jqcm_server/www/api/server_config.php',
    {params}
  )
}

// 获取渠道服务器列表
export function getServerConfigQudao(params) {
  return http.get(
    // 'http://dzztest.8866net.com:83/www/api/server_config_qudao.php',
    'https://m.huojiangame.com:9443/jqcm_server/www/api/server_config_qudao.php',
    {params}
  )
}

// 获取无尽修炼服务器列表
export function getServerConfigWJXL(params) {
  return http.get(
    // 'http://dzztest.8866net.com:83/www/api/server_config_ml.php',
    'https://m.huojiangame.com:9443/jqcm_server/www/api/server_config_ml.php',
    {params}
  )
}

// 获取仙凡传服务器列表
export function getServerConfigXianfanzhuan(params) {
  return http.get(
    // 'https://dzzapi.8866net.com/www/api/server_config_xcx.php',
    'https://m.huojiangame.com:9443/jqcm_server2/www/api/server_config_xcx.php',
    {params}
  )
}

// 获取远端选项信息
export function getRemoteOptions(params) {
  return http.get(
    'https://jqcm.huojiangame.com:11443/jqcm/options.php',
    {params}
  )
}

