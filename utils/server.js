import { getServerConfig, getServerConfigQudao, getServerConfigWJXL,getServerConfigXianfanzhuan } from '@/api/login'

// 获取服务器列表和最后登录服务器
export function handleGetServerConfig(channelId, userId) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: 3,
      channelId: 6008,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfig(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// TapTap获取服务器列表和最后登录服务器
export function handleGetServerConfigTapTap(channelId, userId) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: 6,
      channelId: 6002,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigQudao(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 获取其他服务器列表和最后登录服务器
export function handleGetServerConfigOther(channelId, userId) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: 6,
      channelId: 6002,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigQudao(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 获取单机江湖服务器列表和最后登录服务器
export function handleGetServerConfigDJJH(channelId, userId) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: 6,
      channelId: channelId,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigQudao(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 获取单机江湖无尽修炼1服务器
export function handleGetServerConfigDJJHWJXL(channelId, userId) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: 7,
      channelId: 6046,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigWJXL(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 获取无尽修炼服务器列表和最后登录服务器
export function handleGetServerConfigWJXL(channelId, userId, game_id) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: game_id,
      channelId: channelId,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigWJXL(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 获取无尽修炼2服务器列表和最后登录服务器
export function handleGetServerConfigWJXL2(channelId, userId) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: 8,
      channelId: 6041,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigWJXL(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 获取仙凡传服务器列表和最后登录服务器
export function handleGetServerConfigXianfanzhuan(channelId, userId, game_id) {
  return new Promise((reslove, reject) => {
    const param = {
      v: '1.1.54',
      game_id: game_id,
      channelId: channelId,
      channel: 'biguo',
      user_name: userId
    }
    const reslove1 = reslove
    const reject1 = reject
    getServerConfigXianfanzhuan(param).then(res => {
      const serverInfo = {}
      if (res.server_list) {
        serverInfo.client_ip = res.client_ip
        serverInfo.last_server_list = formatLastServerList(res.last_server_list)
        serverInfo.server_list = formatServerList(res.server_list)
      }
      reslove1(serverInfo)
    }).catch(err => {
      reject1(err)
    })
  })
}

// 将服务器信息格式化，将增加text和value属性用于下拉列表显示
function formatServerList(serverList) {
  const list = serverList.map(item => {
    const obj = {
      text: item.id + '服',
      value: item.id
    }
    item = Object.assign(obj, item)
    return item
  })
  return list.reverse()
};

// 将最后登录服务器信息格式化，将增加text和value属性用于下拉列表显示
function formatLastServerList(serverStr) {
  if (serverStr) {
    const serverList = serverStr.split(',')
    return serverList.map(item => {
      const obj = {
        text: item + '服',
        value: item
      }
      return obj
    })
  }
}
