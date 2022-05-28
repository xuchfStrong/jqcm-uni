/**
 * Created by IvanStrong on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * 生成指定位数的随机数
 * @param {Number} num
 */
export function genRandomNumber(num) {
  return Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1))
}

/**
 * 生成指定位数的随机字符串
 * @param {Number} n
 */
export function randomString(n) {  
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
  let tmp = '',
      i = 0,
      l = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l));
  }
  return tmp;
}

/**
 * 生成UUID
 * @param {*}
 */
export function genUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 生成MAC地址
 * @param {*}
 */
export function genMac() {
  const mac = [
    (0x52).toString(16),
    (0x54).toString(16),
    (0x18).toString(16),
    decimalToHexString(genRandomNumberBetween(200, 100)),
    decimalToHexString(genRandomNumberBetween(200, 100)),
    decimalToHexString(genRandomNumberBetween(200, 100))
  ]
  return mac.join(':')
}

// 将十进制转换为16进制
function decimalToHexString(number) {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1
  } return number.toString(16).toUpperCase()
}

// 生成n-m之间的随机数
function genRandomNumberBetween(m, n) {
  return Math.floor(Math.random() * (m - n)) + n
}

/**
 * 根据Index从options选项中获取value
 * @param {Array} options 
 * @param {Number} index 
 */
export function getValueByIndex(options,index) {
  if (options) {
    return options[index]['value']
  }
}

/**
 * 根据Value从options选项中获取index
 * @param {Array} options 
 * @param {Number, String} Value 
 */
export function getIndexByValue(option, value) {
  if (option) {
    return option.findIndex(item => {
      return item.value === value
    })
  }
}

// 解析get URL请求
export function parseSearchArgs(url) {
  const rst = {};
  if (url.indexOf("?") != -1) {
    const str = url.split("?")[1];
    const parts = str.split("&");
      for(let i = 0; i < parts.length; i++) {
          rst[parts[i].split("=")[0]]=decodeURI(parts[i].split("=")[1]);
      }
  }
  return rst;
}

// 构造multipart/form-data数据
export function genMultipartFormData(data, boundary) {
  let str = '\r\n--' + boundary
  for (let key in data) {
    const keyPart = '\r\nContent-Disposition: form-data; name="' + key +'"'
    const valuePart = '\r\n' + data[key]
    const boundaryPart = '\r\n--' + boundary
    str += keyPart + '\r\n' + valuePart + boundaryPart
  }
  str += '--'
  return str
}

export function toast(msg) {
  uni.showToast({
    title: msg,
    duration: 2000,
    icon: 'none'
  })
}

export function getChannel() {
  // #ifdef APP-PLUS
  return plus.runtime.channel
  // #endif
  // #ifdef H5
  const channelMap = {
    "8080": "2",
    "9090": "0",
    "9091": "1",
    "9092": "2",
    "9093": "3",
    "9094": "4",
    "9095": "5",
    "9096": "6",
    "9097": "7",
    "9098": "8",
    "9100": "10",
    "19031": "31",
  }
  const port = window.location.port
  return channelMap[port] || "0"
  // #endif
}

