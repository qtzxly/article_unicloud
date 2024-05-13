const  db = uniCloud.database()
 
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	//返回数据给客户端
	// return event
	let {skip=0} = event
	const res = await db.collection("article").limit(8).skip(skip).orderBy("posttime","desc").get()
	console.log('res : ', res)
	return res
};
