'use strict';

const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const where = event.game ? {game: event.game} : {}
	const dictList = await db.collection('opendb-dict-list').where(where).get()
	const dictItems = await db.collection('opendb-dict-items').get()
	console.log('dictList', dictList)
	console.log('dictItems', dictItems)
	const DictJson = {}
	dictList.data.forEach(dict => {
		DictJson[dict.key] = []
	})
	dictList.data.forEach(dict => {
		dictItems.data.forEach(dictItem => {
			if (dict.key === dictItem.dict_key) {
				DictJson[dict.key].push({
					text: dictItem.text,
					value: dictItem.value
				})
			}
		})
	})
	
	//返回数据给客户端
	return DictJson
};
