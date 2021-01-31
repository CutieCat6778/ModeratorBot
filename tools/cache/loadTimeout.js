const Timeouts = require('../../models/timeout.js');

module.exports = async (client) => {
	try {
		let timeouts = await Timeouts.find().catch(e => require('../function/error')(e));
		if (timeouts.length != 0) {
			for (let timeout of timeouts) {
				if (timeout.type == 'remind') {
					const date = new Date();
					if (date.getTime() >= timeout.to) {
						const author = await client.users.fetch(timeout.obj.author);
						const content = timeout.obj.args.slice(1).join(" ");
						eval(timeout.function.toString() + '\nf()');
						return require('../database/removeTimeout.js')(timeout.from);
					} else if (date.getTime() < timeout.to) {
						client.timeouts.set(timeouts.indexOf(timeout) ? timeouts.indexOf(timeout) : client.timeouts.size, timeout);
						client.setTimeout(async () => {
							const author = await client.users.fetch(timeout.obj.author);
							const content = timeout.obj.args.slice(1).join(" ");
							eval(timeout.function.toString() + '\nf()');
							return require('../database/removeTimeout.js')(timeout.from);
						}, timeout.to - date.getTime())
					}
				} else if (timeout.type == 'mute') {
					const date = new Date();
					if (date.getTime() >= timeout.to) {
						const guild = await client.guilds.fetch(timeout.obj.args[0]);
						const muterole = guild.roles.cache.get(timeout.obj.args[1]);
						const target = guild.members.cache.get(timeout.obj.author);
						const channel = guild.channels.cache.get(timeout.obj.message);
						const time = require('ms')(timeout.to - timeout.from, { long: true })
						eval(timeout.function.toString() + '\nf()');
						return require('../database/removeTimeout.js')(timeout.from);
					} else if (date.getTime() < timeout.to) {
						client.timeouts.set(timeouts.indexOf(timeout) ? timeouts.indexOf(timeout) : client.timeouts.size, timeout);
						client.setTimeout(async () => {
							const guild = await client.guilds.fetch(timeout.obj.args[0]);
							const muterole = guild.roles.cache.get(timeout.obj.args[1]);
							const target = guild.members.cache.get(timeout.obj.author);
							const channel = guild.channels.cache.get(timeout.obj.message);
							const time = require('ms')(timeout.to - timeout.from, { long: true })
							eval(timeout.function.toString() + '\nf()');
							return require('../database/removeTimeout.js')(timeout.from);
						}, timeout.to - date.getTime())
					}
				}
			}
		}
	} catch (e) {
		return require('../function/error')(e)
	}
}