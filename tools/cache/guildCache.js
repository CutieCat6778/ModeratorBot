module.exports = async function addToCache(client) {
    try {
        let guilds = await require("../../models/guilds").find();
        guilds.map(async g => {
            if (!g.prefixes) {
                g.prefixes = ["mod"];
                await g.updateOne({ prefixes: guild.prefixes });
            }
            if (g.prefixes.length <= 0) {
                g.prefixes.push("mod");
                await g.save();
            }
            if (g.prefix) {
                console.log(a);
                if (!g.prefixes || Array.isArray(g.prefixes) == false) {
                    g.prefixes = [];
                }
                g.prefixes.includes(g.prefix) ? null : g.prefixes.push(g.prefix);
                g.prefix = null;
                await g.save();
            }
            if (!client.guild.get(g._id)) {
                client.guild.set(g._id, g)
            }
        })
    } catch (e) {
        return require('../function/error')(e)
    }
}