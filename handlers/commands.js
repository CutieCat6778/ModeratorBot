const { readdirSync } = require("fs")

module.exports = (client) => {
	try {
		const load = dirs => {
			const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
			for (let file of commands) {
				let pull = require(`../commands/${dirs}/${file}`);
				client.commands.set(pull.config.name, pull);
				if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
			};
		};
		const commands = readdirSync('./commands');
		for(let x of commands){
			load(x);
		}
		return true;
	} catch (e) {
		return require("../tools/function/error")(e, undefined)
	}
};