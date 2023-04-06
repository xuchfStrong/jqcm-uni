// import RequestCloud from './RequestCloud.js'
import {requestProxy, http, httpForm} from './request.js'
import { http as httpNoProxy, httpForm as httpFormNoProxy } from '@/utils/request.js'

export function getAction(url,params, header={}) {	
	return http.get(
		url,
		{params, header}
	)
}

export function postAction(url,data, header={}, dest=undefined) {	
	return http.post(
		url,
		data,
		{dest,header}
	)
}

export function postFormAction(url,data, header={}, dest=undefined) {	
	return httpForm.post(
		url,
		data,
		{dest,header}
	)
}

// 不走代理的
export function getActionNoProxy(url,params, header={}) {	
	return httpNoProxy.get(
		url,
		{params, header}
	)
}

export function postActionNoProxy(url,data, header={}) {	
	return httpNoProxy.post(
		url,
		data,
		{header}
	)
}

export function postFormActionNoProxy(url,data, header={}) {	
	return httpFormNoProxy.post(
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
