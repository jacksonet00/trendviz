module.exports.yesterdaysDate = () =>  {
	const yesterday = new Date((new Date()).valueOf() - 2*1000*60*60*24);
	return yesterday.toISOString().substring(0, 10);
};