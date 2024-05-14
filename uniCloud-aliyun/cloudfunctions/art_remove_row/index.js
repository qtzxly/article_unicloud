const db = uniCloud.database()
exports.main = async (event, context) => {
	let {id} = event
	await db.collection("article").doc(id).remove()
	return
};
