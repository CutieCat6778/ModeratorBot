const Guild = require("../../models/guilds");
module.exports = async function getGuild(client, id) {
    const guild = await Guild.findOne({ _id: id }).catch(e => require('../function/error')(e, undefined))
    if (!guild) {
        const guild = await require('./newGuild')(client, id);
        return guild
    }
    if(!guild.starboard){
        guild.starboard = {
            "enable": false, "_id": ""
        }
        await guild.save();
    }
    return guild;
}