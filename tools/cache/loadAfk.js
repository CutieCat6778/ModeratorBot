const Afk = require('../../models/afk.js');

module.exports = async (client) => {
	try {
		const AFK = await Afk.find().catch(e => require('../function/error.js')(e));
		if (!AFK) return;
		else if (AFK) {
			for (let afk of AFK) {
				client.afk.set(afk._id, afk);
			}
			return true;
		}
	} catch (e) {
		return require('../function/error')(e)
	}
}