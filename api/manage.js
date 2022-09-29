// import RequestCloud from './RequestCloud.js'
import {requestProxy, http, httpForm} from './request.js'

export function getAction(url,params, header={}) {	
	return http.get(
		url,
		{params, header}
	)
}

export function postAction(url,data, header={}) {	
	return http.post(
		url,
		data,
		{header}
	)
}

export function postFormAction(url,data, header={}) {	
	return httpForm.post(
		url,
		data,
		{header}
	)
}

export function getRoleInfo(params, header) {
	// const requestCloud = new RequestCloud()
	// return requestProxy({
	// 	"url": "http://wdsz2.huojiangame.com:11658/ljxz/get_role_info_new.php",
	// 	"method": "GET",
	// 	"data": data
	// })
	
	return http.get(
		"/ljxz/get_role_info_t.php",
		{params, header}
	)
}
