'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const apiUrl = 'http://wdsz2.huojiangame.com:11658/ljxz/get_role_info_new.php'
	const res = await uniCloud.httpclient.request(apiUrl, {
	    method: 'GET',
	    data: {
	      userid: event.userid,
				server_id: event.server_id
	    },
	    contentType: 'json', // 指定以application/json发送data内的数据
	    dataType: 'json' // 指定返回值为json格式，自动进行parse
	  })
	// console.log(res.data)
	//返回数据给客户端
	return res.data
};
