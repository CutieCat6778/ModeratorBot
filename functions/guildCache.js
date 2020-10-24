module.exports = async function addToCache(client) {
    let guilds = await require("../models/guilds").find();
    client.guild = new Map();
    guilds.map(g => {
        if(!client.guild.get(g.guildId)){
            client.guild.set(g.guildId, g)
        }
    })
}