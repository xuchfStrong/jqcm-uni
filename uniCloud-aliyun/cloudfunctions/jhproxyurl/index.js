'use strict';

function combineURLs(baseURL, relativeURL) {
	if(new RegExp("^http").test(relativeURL)) {
	    return relativeURL;
	}
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const body = JSON.parse(event.body)
	const baseURL = 'http://81.70.228.171:24783'
	const apiUrl = combineURLs(baseURL, body.url)
	try {
		const res = await uniCloud.httpclient.request(apiUrl, {
		    method: body.method,
		    data: body.data,
			headers: body.header,
		    contentType: body.contentType || 'json', // 默认指定以application/json发送data内的数据
		    dataType: 'json' // 指定返回值为json格式，自动进行parse
		  })
		//返回数据给客户端
		res.data.headers = res.headers
		return res.data
	} catch(err) {
		// return "have error!!"
		return err
	}
	
};