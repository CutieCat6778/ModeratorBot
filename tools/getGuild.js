const Guild = require("../models/guilds");
module.exports = async function getGuild(client, id) {
    const guild = await Guild.findOne({ guildId: id }).catch(e => require('./error')(e, undefined))
    if (!guild) {
        const guild = await require('./newGuild')(client, id);
        return guild
    }
    return guild;
}