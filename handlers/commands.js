const { readdirSync } = require("fs")

module.exports = async(client) => {
	try {
		const cmds = [];
        const cmd = [];
		await readdirSync('./commands').forEach(async a => await readdirSync('./commands/'+a).map(b => cmds.push(b) && cmd.push(b)));
		const load = dirs => {
			const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
			for (let file of commands) {
				let pull = require(`../commands/${dirs}/${file}`);
				!pull.category ? pull.category = dirs : null;
				client.commands.set(pull.config.name, pull);
				if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
				if (!cmds.includes(pull.config.name + ".js")) {
					console.log(`Missing ${pull.config.name}`)
				} else if (cmds.includes(pull.config.name + ".js")) {
					cmd.splice(cmd.indexOf(pull.config.name + ".js"), 1);
				}
			};
		};
		const commands = readdirSync('./commands');
		for (let x of commands) {
			await load(x);
		}
		let value = true;
		console.log('--- LOADING ALL COMMANDS ---')
		cmds.forEach(a => {
			if (!cmd.includes(a)) {
				console.log(`${a}: ✅`)
			} else if (cmd.includes(a)) {
				console.log(`${a}: ❌`);
				value = false;
			}
		})
		return value;
	} catch (e) {
		return require("../tools/function/error")(e, undefined)
	}
};