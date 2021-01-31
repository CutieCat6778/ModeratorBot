const a = require('../../models/timeout.js');

module.exports = async(time) => {
	const timeout = await a.findOne({from: time}).catch(e => require('../function/error')(e));
	return timeout ? timeout : undefined;
}