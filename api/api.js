// import RequestCloud from './RequestCloud.js'
import {requestProxy, http, httpForm} from './request.js'

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

export function login(data) {
	return httpForm.post(
		"http://wdsz2.huojiangame.com:11658/ljxz/add_user.php",
		data
	)
}