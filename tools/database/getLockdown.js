const a = require('../../models/lockdown.js');

module.exports = async(id) => {
	const afk = await a.findOne({_id: id}).catch(e => require('../function/error')(e));
	return afk ? afk : undefined;
}