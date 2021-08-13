import RequestCloud from './RequestCloud.js'

const requestCloud = new RequestCloud()
const requestProxy = (options) => requestCloud.request(options)

const http = new RequestCloud()
const httpForm = new RequestCloud()

httpForm.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = ''
  config.contentType = 'x-www-form-urlencoded'
  return config
})

export {
	requestProxy,
	http,
	httpForm
}
