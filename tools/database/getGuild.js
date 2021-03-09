const Guild = require("../../models/guilds");
module.exports = async function getGuild(client, id) {
    const guild = await Guild.findOne({ _id: id }).catch(e => require('../function/error')(e, undefined))
    if (!guild) {
        const guild = await require('./newGuild')(client, id);
        return guild
    }
    console.log(guild.prefix, guild.prefixes)
    if(!guild.starboard){
        guild.starboard = {
            "enable": false, "_id": ""
        }
        await guild.save();
    }
    if(!guild.prefixes){
        guild.prefixes = ["mod"];
        await guild.updateOne({prefixes: guild.prefixes});
    }
    if(guild.prefixes.length <= 0){
        guild.prefixes.push("mod");
        await guild.save();
    }
    if(guild.prefix){
        if(typeof(guild.prefix) == "string"){
            if(!guild.prefixes || Array.isArray(guild.prefixes) == false){
                guild.prefixes = [];
            }
            guild.prefixes.push(guild.prefix);
            guild.prefix = undefined;
            await guild.save();
        }
    }
    return guild;
}