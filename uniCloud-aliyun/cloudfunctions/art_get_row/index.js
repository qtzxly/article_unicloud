const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	//返回数据给客户端
	let {id} = event;
	const res = await db.collection("article").doc(id).get();
	return res
};
