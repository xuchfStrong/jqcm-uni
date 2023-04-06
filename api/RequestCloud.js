export default class RequestCloud {
	config = {
		contentType: 'json'
	}
	
	setConfig(f) {
	  this.config = f(this.config)
	}
	
	// 这种写法和下面的在回调函数种直接返回Promise.reslove和Promise.reject效果是一样的
	async requestOld(options = {}) {
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name:"jqcmproxy",
				data: {
					"url": options.url,
					"method": options.method,
					"header": options.header || {},
					"contentType": options.contentType || this.config.contentType,
					"data": options.data || {}
				},
				success: (e) => {
					resolve(e.result)
				},
				fail: (e) => {
					reject({"result": "some error"})
				}
			})
		})
	}
	
	async request(options = {}) {
		return uniCloud.callFunction({
			name:"jqcmproxy",
			data: {
				"url": options.url,
				"method": options.method,
				"header": options.header || {},
				"contentType": options.contentType || this.config.contentType,
				"data": options.data || {},
				"dest": options.dest || undefined
			}
		}).then(res => {
			return Promise.resolve(res.result)
		}).catch(err => {
			console.log('err', err)
			return Promise.reject(new Error("is error"))
		})
	}
	
	get(url, options = {}) {
		return this.request({
		  url,
		  method: 'GET',
			header: options.header,
			data: options.params,
		  ...options
		})
	}
	
	post(url, data, options = {}) {
	  return this.request({
	    url,
	    data,
	    method: 'POST',
			header: options.header,
	    ...options
	  })
	}

	async requestSecondStepByProxy(options = {}) {
		return uniCloud.callFunction({
			name:"secondStep",
			data: {
				"url": options.url,
				"method": options.method,
				"header": options.header || {},
				"contentType": options.contentType || this.config.contentType,
				"data": options.data || {}
			}
		}).then(res => {
			return Promise.resolve(res.result)
		}).catch(err => {
			return Promise.reject({"result":"some error"})
		})
	}
	
	getSecondStepByProxy(url, options = {}) {
		return this.requestSecondStepByProxy({
		  url,
		  method: 'GET',
			header: options.header,
			data: options.params,
		  ...options
		})
	}
	
	postSecondStepByProxy(url, data, options = {}) {
	  return this.requestSecondStepByProxy({
	    url,
	    data,
	    method: 'POST',
			header: options.header,
	    ...options
	  })
	}

	async requestGYY(options = {}) {
		return uniCloud.callFunction({
			name:"gyyproxy",
			data: {
				"url": options.url,
				"method": options.method,
				"header": options.header || {},
				"contentType": options.contentType || this.config.contentType,
				"data": options.data || {}
			}
		}).then(res => {
			return Promise.resolve(res.result)
		}).catch(err => {
			return Promise.reject({"result":"some error"})
		})
	}
	
	getGYY(url, options = {}) {
		return this.requestGYY({
		  url,
		  method: 'GET',
			header: options.header,
			data: options.params,
		  ...options
		})
	}
	
	postGYY(url, data, options = {}) {
	  return this.requestGYY({
	    url,
	    data,
	    method: 'POST',
			header: options.header,
	    ...options
	  })
	}
}