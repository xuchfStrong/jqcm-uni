const CryptoJS = require('crypto-js')

const key = 'f9drs5uy'
const res_chiper = 'Hb7nBjwQwvXayKhl3H/CzT5rqyvc1+cfR94zTNcfuZBExEVJ/lqhPcqUGf6LjJ30Pp+oFayTiUC6hyMo1OlOrGAHFeLMqduBivHSrxmOsQAsR5B6ZVR7vWjqG9ucjJoxHHTJpf9PW0kPl8wxFTva/HAo12bMkFw5ocnB/mpBo/4jMXj0h6WDP7/TScToCtrx08i234cq8F6OtinPrVL1CUxtP/ll0gkUwG13eL3HoXL9Ds/tqzL8p5aHdcEgZvMqT9Fm3s5bi75Lt9dDDJfMOmc8a/fzP3PLf8r0YwN5qRjNJrS5bcZsu5mvJSeTtIFrYZUvCzTk4l6dOqVwKWtgIh+im7Pc1dFAHac6S2ryzB2c4IHc5ayXsxJBUQrgqQ46+s1zL34NZF0dp5O4bmsp/gDoSXKqcIRs'
const send_chiper = 'HRA6aE9khcaAm7KkqeJzF/WsenKPSSluxqrQnGzhzNEyUdVpB+kp6+ECI5n6XG7XrOeaXlucfZx4ulmYfhQ34BrDolD9VFgPBCLjnSKk3GJW5sn9BxUYpEr24wpFIRcDiR5TlQestmpqadiY3JhVUBcI+4ClQtMB9zc07aZdsveL6V3DnLIp34vhedsOCxn/nw1MNcOS77yENWz19Moof5xd9LwfGZsLEe/UlJhS6KJBU/bhRHXxnLhdbsdp8UwkByx6X9ZWs/sGWKrNPWlcSVukjbBDcyK5XV04zDJTiUS618R389NVd2QXhIke6dKDYqgx0wFQIgb6oJxzaYnVD++LpiW9zKK2ORuMteWlyeidVGF9Nz5lwM/mKSsAFa2yi8GZPclYsBr0A1LJLzqI95IwRkt5A6XSz2raELq4n7NUt9fCHMiOFV1KHaS6+5Qb8S7t8DIIroR8JfGsVkRRFw5CLwo8PQDgEWQ7V6NN6J+GcvGmphashAiQyy94xwH6k3hazfNLHkvqVVXdBiRMjTpXrwJKH9udLUcy4KD33jk8h2nSZw8wfLuqLE60x5rS8071yz725a7IKfFMDwhvqOZSjfEiZ0RD7usHeayE2Zy2ItKw0B52HFgoWnm3VsOi0fWUD782SsFUgNB2zaMM2ImBZJAjdg1atnDRtCysMpxJMtRxaSovJ0hwMQ5fYb3gxDnZKIMG9tkW67MmuFvAlwrKtBsdbiZSG+dH8PVVRv1FrtL76Ia0RKcDf5+dvWrUjq2nPncdz9KKC7hn3mJsIvSLX2k0wlsBEmjMK8LHCQBSqXaJ+ZCVceKdbZOBpRRaD6/6yb2+LZaVhsZ/16niSPYX4LhvpJXdUxjPIgb6pKwZLsLGMpbOgJInaSP87sZQnf5uR6PKc8hj9sWZ4NP0Jw=='
const send_plain = '{"imei":"860615045494188","androidid":"84f2301dd7aeef87","imsi":"oaid-f1b0d7fb-3f37-54a6-7770-afbffd1ed691","uuid":"548b8e18-1ffe-4692-a509-440cf87be4c1","os":1,"gamekey":"vQhKJMvaYEHwmvFb","fenbaoid":"","gamepkgname":"com.cxgame.xfz","gamepkgversion":"0.0.1","gamebuildversion":"0.0.1","osversion":"9","carrier":"中国电信","devicemodel":"HUAWEI LYA-AL00","screensize":"1080x2145","scene":"unknown","mac_address":"FC:AB:90:BF:3F:BB","sdkversion":"1.0.0","batterylevel":"94%","batterystate":"charging","netstate":"4G","game_key":"vQhKJMvaYEHwmvFb","gameKey":"vQhKJMvaYEHwmvFb","sdk_type":"js-h5","login_type":1,"account":"cx046197270","password":"a7nv2Q","agree_agreement":false}'

//CBC模式解密
function decryptByDESModeCBC(ciphertext2) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var ivHex = CryptoJS.lib.WordArray.create([0x01020304, 0x05060708], 8)
  // var ivHex = CryptoJS.enc.Utf8.parse(iv);
  // direct decrypt ciphertext
  var decrypted = CryptoJS.DES.decrypt({
  // ciphertext: CryptoJS.enc.Hex.parse(ciphertext2)
  ciphertext: CryptoJS.enc.Base64.parse(ciphertext2)
  }, keyHex, {
  iv:ivHex,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function encryptByDESModeCBC(message) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  // var ivHex = CryptoJS.enc.Utf8.parse(key);
  var ivHex = CryptoJS.lib.WordArray.create([0x01020304, 0x05060708], 8)
  encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv:ivHex,
    mode: CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

const send_chiper2 = encryptByDESModeCBC(send_plain)
console.log(send_chiper2)
const res_plain = decryptByDESModeCBC(send_chiper2)
console.log(res_plain)
