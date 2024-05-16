const db = uniCloud.database()

exports.main = async (event, context) => {
	let {
		detail,picurls
	} = event
	console.log('picurls',picurls);
	const res = await db.collection("article").doc(detail._id).update({
		title: detail.title,
		author: detail.author,
		context: detail.content,
		picurls
		// posttime: Date.now()
	})

	return res
};