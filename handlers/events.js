const { readdirSync } = require("fs")

module.exports = (client) => {
    try {
        const load = dirs => {
            const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
            for (let file of events) {
                const evt = require(`../events/${dirs}/${file}`);
                let eName = file.split('.')[0];
                client.on(eName, evt.bind(null, client));
            };
        };
        const commands = readdirSync('./events');
		for(let x of commands){
			load(x);
		}
        return true;
    } catch (e) {
        return require("../tools/function/error")(e, undefined)
    }
};