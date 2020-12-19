import { http, httpForm } from '@/utils/request.js'

// 获取远端选项信息
export function getRemoteOptions(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/options.php',
    {params}
  )
}

// 获取更新信息
export function getUpdate(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/update.php',
    {params}
  )
}

// 获取角色信息
export function getRoleInfo(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/get_role_info.php',
    {params}
  )
}

// 获取配置信息
export function getConfigInfo(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/get_role_settings.php',
    {params}
  )
}

// 修改配置信息
export function changeConfigInfo(data) {
  return httpForm.post(
    'http://jqcm.huojiangame.com:11658/jqcm/change_settings.php',
    data
  )
}

export function getDescription(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm//description.php',
    {params}
  )
}

export function getHelp(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm//help_info.php',
    {params}
  )
}

export function getGonglue(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm//gonglue.php',
    {params}
  )
}

export function startGuaji(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/start.php',
    {params}
  )
}

export function stopGuaji(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/stop.php',
    {params}
  )
}

export function getUtils(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/utils.php',
    {params}
  )
}

export function getIntUserid(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/get_int_uid.php',
    {params}
  )
}

export function getStrUserid(params) {
  return http.get(
    'http://jqcm.huojiangame.com:11658/jqcm/get_str_uid.php',
    {params}
  )
}

// 转移时间
// 修改配置信息
export function transferTime(data) {
  return httpForm.post(
    'http://jqcm.huojiangame.com:11658/jqcm/transfer_time.php',
    data
  )
}
