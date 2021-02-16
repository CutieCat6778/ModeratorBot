const Afk  = require('../../models/lockdown.js');

module.exports = async(id) => {
	try{
		const afk = await Afk.findOne({_id: id}).catch(e => require('../function/error')(e));
		afk.remove()
		return true
	}catch(e){
		return require('../function/error')(e);
	}
}