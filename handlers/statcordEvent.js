const { readdirSync } = require("fs")

module.exports = async(statcord, client) => {
    try {
        const cmds = [];
        const cmd = [];
		await readdirSync('./events/statcord').map(b => cmds.push(b) && cmd.push(b))
        const load = dirs => {
            const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
            for (let file of events) {
                const evt = require(`../events/${dirs}/${file}`);
                let eName = file.split('.')[0];
                statcord.on(eName, evt.bind(null, client, statcord));
                if(!cmds.includes(eName+".js")){
                    console.log(`Missing ${eName+".js"}`)
				}else if(cmds.includes(eName+".js")){
                    cmd.splice(cmd.indexOf(eName+".js"), 1);
				}
            };
        };
		load("statcord");
        let value = true;
        console.log('--- LOADING ALL STATCORD EVENT ---')
        cmds.forEach(a => {
			if(!cmd.includes(a)){
				console.log(`${a.slice(0, 1).toUpperCase() + a.slice(1)}: ✅`)
			}else if(cmd.includes(a)){
				console.log(`${a.slice(0, 1).toUpperCase() + a.slice(1)}: ❌`)
                value = false;
			}
		})
        return value;
    } catch (e) {
        return require("../tools/function/error")(e, undefined)
    }
};