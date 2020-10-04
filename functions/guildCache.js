module.exports = async function addToCache(client, guildid) {
    let guilds = await require("../models/guilds").find();
    guilds.map(g => {
        if(!client.guild.get(guildid)){
            client.guild.set(guildid, {
                prefix: g.prefix,
                logs: g.logs,
                textfilter: g.textfilter
            })
        }
    })
}