module.exports = async function addToCache(client) {
    try {
        let guilds = await require("../../models/guilds").find();
        guilds.map(g => {
            if (!client.guild.get(g._id)) {
                client.guild.set(g._id, g)
            }
        })
    } catch (e) {
        return require('../function/error')(e)
    }
}