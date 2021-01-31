const Afk  = require('../../models/timeout.js');

module.exports = async(id) => {
	try{
		const afk = await Afk.findOne({from: id}).catch(e => require('../function/error')(e));
		afk.remove()
		return true;
	}catch(e){
		return require('../function/error')(e);
	}
}