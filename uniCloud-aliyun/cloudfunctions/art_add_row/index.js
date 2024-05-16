const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		detail, picurls
	} = event

	// return detail
	// console.log('event : ', event)

	const res =  await db.collection("article").add({
		posttime: Date.now(),
		picurls,
		...detail
	})

	//返回数据给客户端
	return res
};