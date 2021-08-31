// import { http, httpForm } from '@/utils/request.js'
import {requestProxy, http, httpForm} from './request.js'

// // 登录一步
// export function loginFirstStep(data) {
//   return http.post(
//     'http://m.huojiangame.com:9080/jqcm_login/api/login',
//     data
//   )
// }

// // 登录二步获取用户token
// export function loginSecondStep(params) {
//   return http.get(
//     'http://m.huojiangame.com:9080/jqcm_usertoken/user/v1/token',
//     {params}
//   )
// }

// 剑气除魔登录第一步
export function loginFirstStepShendao(params) {
  return http.get(
    'http://api.1017sy.cn/index.php',
    {params}
  )
}

// 登录第三步
export function loginThirdStep(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index.php',
    {params}
  )
}

// 单机江湖无尽修炼1登录第三步
export function loginThirdStepDDJHWJXL1(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index_ml.php',
    {params}
  )
}


// 无尽修炼2登录一步
// export function loginFirstStepWJXL2(data) {
//   return http.post(
//     'http://m.huojiangame.com:9080/jqcm_login_wjxl2/api/login',
//     data
//   )
// }

// 无尽修炼2登录第三步
export function loginThirdStepWJXL2(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index_hlyx.php',
    {params}
  )
}

// 无尽修炼1登录第三步
export function loginThirdStepWJXL(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index_ml.php',
    {params}
  )
}

// 神道登录第三步
export function loginThirdStepShendao(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index_lw.php',
    {params}
  )
}

// TapTap登录第一步
export function loginFirstStepTapTap(data) {
  return httpForm.post(
    'http://sdk.66hjh.com/user/login',
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
    'http://dzztest.dzz.begindcc.com/game/biguo/index_qudao.php',
    {params}
  )
}

// 道友渡劫不登录第一步
// export function loginFirstStepDYDJB(data, header) {
//   return httpForm.post(
//     // 'http://www.fzsyouxi.com/api/authorizations',
//     'http://m.huojiangame.com:9080/jqcm_login_dydjb/api/authorizations',
//     data,
//     {header}
//   )
// }

// // 道友渡劫不登录第二步
// export function loginSecondStepDYDJB(params, header) {
//   return http.get(
//     // 'http://www.fzsyouxi.com/api/user',
//     'http://m.huojiangame.com:9080/jqcm_login_dydjb/api/user',
//     {params, header}
//   )
// }

// 道友渡劫不登录第三步
export function loginThirdStepDYDJB(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index_ww.php',
    {params}
  )
}

// 飞仙诀羔羊游登录第二步
export function loginSecondStepFeixianjueGYY(params) {
  return http.get(
    'http://www.gaoyangh5.com/mediawide.php?s=/Game/open_game/game_id/1127.html',
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
    'https://dzztest.dzz.begindcc.com/game/biguo/index_xcx.php',
    {params}
  )
}

// 最强修仙修改器登录第一步
export function loginFirstStepZuiqiangxiuxian(data) {
  return httpForm.post(
    'https://m.xiaotengyouxi.com/account/authorize',
    data
  )
}

// 最强修仙修改器登录第二步
export function loginSecondStepZuiqiangxiuxian(params) {
  return  http.get(
    'https://jq.8866net.com/game/bn/login.php',
    {params}
  )
}

// 人渣反派登录第一步
export function loginFirstStepRenzhafanpai(data) {
  return httpForm.post(
    'https://p.kuafugame.com/api/user/login',
    data
  )
}

// 人渣反派登录第二步
export function loginSedondStepRenzhafanpai(params) {
  return http.get(
    'http://api.1017sy.cn/index.php',
    {params}
  )
}

// 天影奇缘登录第一步
export function loginFirstStepTianyingqiyuan(params) {
  return http.get(
    'http://api.1017sy.cn/index.php',
    {params}
  )
}

// 天影奇缘登录第二步获取token
export function loginSecondTianyingqiyuan(params) {
  return http.get(
    'http://gw.begindcc.com/ufo/api/6/user/token',
    {params}
  )
}

// 江湖传说登录第一步
export function loginFirstStepJHCS(params) {
  return http.get(
    'https://h5.h5youyou.com/user/login',
    {params}
  )
}

// 江湖传说登录第二步
export function loginSecondStepJHCS(params) {
  return http.get(
    'https://h5.h5youyou.com/game/start',
    {params}
  )
}

// 江湖传说登录第三步
export function loginThirdStepJHCS(params) {
  return http.get(
    'https://gw.begindcc.com/ufo/api/6/user/token',
    {params}
  )
}

// 江湖传说登录第四步
export function loginFourStepJHCS(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/game/biguo/index_ml.php',
    {params}
  )
}

export function getServerConfig(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/www/api/server_config.php',
    {params}
  )
}

// 获取渠道服务器列表
export function getServerConfigQudao(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/www/api/server_config_qudao.php',
    {params}
  )
}

// 获取无尽修炼服务器列表
export function getServerConfigWJXL(params) {
  return http.get(
    'http://dzztest.dzz.begindcc.com/www/api/server_config_ml.php',
    {params}
  )
}

// 获取仙凡传服务器列表
export function getServerConfigXianfanzhuan(params) {
  return http.get(
    'https://dzztest.dzz.begindcc.com/www/api/server_config_xcx.php',
    {params}
  )
}

// 获取最强修仙编辑器服务器列表
export function getServerConfigZuiqiangxiuxian(params) {
  return http.get(
    'https://jq.8866net.com/www/api/server_config.php',
    {params}
  )
}

// 获取飞仙诀(羔羊游)服务器列表
export function getServerConfigFeixianjueGYY(params) {
  return http.get(
    'https://admin-fxj.zhijiangames.com/www/api/server_config.php',
    {params}
  )
}


