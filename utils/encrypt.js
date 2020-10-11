import CryptoJS from 'crypto-js'


//CBC模式加密
export function encryptByDESModeCBC(message, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  // const ivHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.lib.WordArray.create([0x01020304, 0x05060708], 8)
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv:ivHex,
    mode: CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}


//CBC模式解密
export function decryptByDESModeCBC(ciphertext2, key) {
  // 一般情况，给的key和iv都是字符串，CryptoJS会将这个转换为16进制的。
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  // const ivHex = CryptoJS.enc.Utf8.parse(iv);
  // 因为在本案例中iv是 0x01 0x03 0x03 0x04 0x05 0x06 0x07 0x08 8个字节，所以直接采用下面的方式定义ivHex
  const ivHex = CryptoJS.lib.WordArray.create([0x01020304, 0x05060708], 8)
  // direct decrypt ciphertext
  const decrypted = CryptoJS.DES.decrypt({
  // ciphertext: CryptoJS.enc.Hex.parse(ciphertext2)
  ciphertext: CryptoJS.enc.Base64.parse(ciphertext2)
  }, keyHex, {
  iv:ivHex,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}