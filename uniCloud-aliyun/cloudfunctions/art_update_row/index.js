const db = uniCloud.database()

exports.main = async (event, context) => {
	let {
		detail
	} = event

	const res = await db.collection("article").doc(detail._id).update({
		title: detail.title,
		author: detail.author,
		context: detail.content,
		// posttime: Date.now()
	})

	return res
};